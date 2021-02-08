import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../../../../common/components"; // avoid long nesting..
import '../styles/_discover-block.scss';
import spotifyIcon from "../../../../../assets/images/spotify.png";
import config from "../../../../../config";
import { setToken } from "../../../../../actions"

function scrollContainer(id, { isNegative } = {}) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

export default function DiscoverBlock({ text, id, data = [], loader = false, imagesKey = 'images' }) {
  const { token = null } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const intervalRef = useRef();
  const [externalWindow, setExternalWindow] = useState();

  /* for connecting spotify to the app in a new window */
  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(() => {
        try {
          const currentUrl = externalWindow.location.href;
          const pars = getHashParams(currentUrl);
          const _token = pars[0];
          if (!_token) {
            return;
          }
          externalWindow.close()
          dispatch(setToken(_token))
          clearTimer();
        } catch (error) {
        } finally {
          if (!externalWindow || externalWindow.closed) {
            clearTimer();
          }
        }
      }, 700);
    }
    return () => {
      if (externalWindow) externalWindow.close();
    };
  }, [externalWindow]);

  const getHashParams = (path) => {
    let hashParams = [];
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = path;
    while (e = r.exec(q)) {
      hashParams = [...hashParams, decodeURIComponent(e[2])];
    }
    return hashParams;
  }
  const createPopup = ({
    url, title, height, width,
  }) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const externalPopup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`,
    );
    return externalPopup;
  };
  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const onSpotify = () => {
    let url = `https://accounts.spotify.com/authorize?client_id=${config.api.clientId}&response_type=token&redirect_uri=${config.api.callbackURL}&scope=${config.api.scopes}&show_dialog=true`
    setExternalWindow(createPopup({
      url, title: 'Login with Spotify', width: 800, height: 600
    }));
  }
  /* spotify connect window ends here */


  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
        {!token ? <div className="spotify-connect" onClick={onSpotify}>
          <img src={spotifyIcon} height={50} width={50} /><span>Connect</span>
        </div> : loader ? <Loader /> :
            data.map(({ [imagesKey]: images, name }) => (
              <DiscoverItem key={name} images={images} name={name} />
            ))}
      </div>
    </div>
  );
}
