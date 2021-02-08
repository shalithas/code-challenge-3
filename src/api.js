import axios from "axios";
import config from "./config";

export const getAuthToken = () => {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = "";

  // Set token
  let _token = hash.access_token;

  const authEndpoint = "https://accounts.spotify.com/authorize";

  // Replace with your app's client ID, redirect URI and desired scopes
  const clientId = config.api.clientId;
  const redirectUri = "http://localhost:3000";
  const scopes = ["user-read-email"];
  console.log("token ...", _token);
  if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token`;
    return new Promise((resolve, reject) => {
      resolve(undefined);
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve(_token);
    });
  }
  //   const accessToken =
  //     "BQCMDcMNSotoVfZRAt-K5hPw7ugPFojVStOGE84XdFTRvOSkS76DRKgWbfuWE6n1SgGhyu4_dZjc7hQb65ApqgqaIKQstiut_tc-QXdWDhftE8Tqndy-zgFdXVD9dJWtUrQczTpt3t1sMlcngCdDEfGuMFuRMBBHy8IfzAvzLJaIAvnsixrF1Ws_MRmRof6_MjaO-lAcwja95PwnJwtaT3waN1rPm1JQJz5liw";
  //   return new Promise((resolve, reject) => {
  //     resolve(accessToken);
  //   });
};
export const getReleases = (token) => {
  const url = `${config.api.baseUrl}/browse/new-releases`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(url, { headers });
};

// 	https://api.spotify.com/v1/browse/featured-playlists
export const getFeaturedPlaylists = (token) => {
  const url = `${config.api.baseUrl}/browse/featured-playlists`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(url, { headers });
};

// https://api.spotify.com/v1/browse/categories
export const getCategories = (token) => {
  const url = `${config.api.baseUrl}/browse/categories`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(url, { headers });
};
