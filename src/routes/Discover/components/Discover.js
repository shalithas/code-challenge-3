import React, { useReducer } from "react";
import {
  getAuthToken,
  getReleases,
  getFeaturedPlaylists,
  getCategories,
} from "../../../api";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

const initialState = {
  isReleaseLoading: false,
  isPlaylistLoading: false,
  isCategoriesLoading: false,
  newReleases: [],
  playlists: [],
  categories: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIATE_RELEASE_LOADING":
      return { ...state, isReleaseLoading: true };
    // return { ...state, isReleaseLoading: true };
    case "RELEASE_ALBUMS_SUCCESS":
      return { ...state, isReleaseLoading: false, newReleases: action.payload };
    case "INITIATE_FEATURED_PLAYLIST_LOADING":
      return { ...state, isPlaylistLoading: true };
    case "FEATURED_PLAYLIST_SUCCESS":
      return { ...state, isPlaylistLoading: false, playlists: action.payload };
    case "INITIATE_CATEGORIES_LOADING":
      return { ...state, isCategoriesLoading: true };
    case "CATEGORIES_SUCCESS":
      return {
        ...state,
        isCategoriesLoading: false,
        categories: action.payload,
      };
    default:
      return state;
  }
};

const Discover = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getNewReleases = (token) => {
    dispatch({ type: "INITIATE_RELEASE_LOADING" });
    getReleases(token).then((response) => {
      const {
        status,
        data: { albums },
      } = response;
      if (status === 200) {
        dispatch({ type: "RELEASE_ALBUMS_SUCCESS", payload: albums.items });
      }
    });
  };
  const loadPlaylists = (token) => {
    dispatch({ type: "INITIATE_FEATURED_PLAYLIST_LOADING" });
    getFeaturedPlaylists(token).then((response) => {
      console.log("playlists ..", response);
      const {
        status,
        data: { playlists },
      } = response;
      if (status === 200) {
        dispatch({
          type: "FEATURED_PLAYLIST_SUCCESS",
          payload: playlists.items,
        });
      }
    });
  };

  const loadCategories = (token) => {
    dispatch({ type: "INITIATE_CATEGORIES_LOADING" });
    getCategories(token).then((response) => {
      console.log("categories ..", response);
      const {
        status,
        data: { categories },
      } = response;
      if (status === 200) {
        dispatch({
          type: "CATEGORIES_SUCCESS",
          payload: categories.items,
        });
      }
    });
  };

  React.useEffect(() => {
    getAuthToken().then((response) => {
      if (response) {
        getNewReleases(response);
        loadPlaylists(response);
        loadCategories(response);
      }
    });
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={state.newReleases}
        loading={state.isReleaseLoading}
      />
      <DiscoverBlock
        text="FEATURED PLAYLISTS"
        id="featured"
        data={state.playlists}
      />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={state.categories}
        imagesKey="icons"
      />
    </div>
  );
};
export default Discover;
