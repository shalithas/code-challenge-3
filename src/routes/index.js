import React, { useEffect, useState } from "react";
import config from "../config";
import Discover from "./Discover";

export default function Routes() {
  const [token, setToken] = useState("");
  // State variable to track if 401 error occurred during API call
  // initialize it with true so the very first request can go
  const [error, setError] = useState({});
  const [newReleases, setNewReleases] = useState({});
  const [playlists, setPlaylists] = useState({});
  const [categories, setCategories] = useState({});
  // Get AccessToken
  useEffect(() => {
    const auth = btoa(`${config.api.clientId}:${config.api.clientSecret}`);
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    const getToken = async () => {
      const res = await fetch(`${config.api.authUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
        },
        body,
        redirect: "follow",
      });
      const result = await res.json();
      setToken(result.access_token);
    };
    getToken();
  }, [error /** dependencies to refresh token if error value changes*/]);
  // Get Data from Spotify
  useEffect(() => {
    // return is token is false (to prevent requiting before token is set)
    if (!token) return;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const getAlbum = async (categories) => {
      const res = await fetch(`${config.api.baseUrl}/browse/${categories}`, {
        headers,
      });
      if (res.status === 401) {
        throw new Error(res.status);
      }
      return res.json();
    };

    const getData = async () => {
      try {
        const [newReleases, featured, categories] = await Promise.all([
          getAlbum("new-releases"),
          getAlbum("featured-playlists"),
          getAlbum("categories"),
        ]);
        setNewReleases(newReleases.albums);
        setPlaylists(featured.playlists);
        setCategories(categories.categories);
      } catch (error) {
        if (error.message === "401") {
          // setting error to a new object so that a token refresh can happen
          // the trick hear is a object literal will always cause a reRender
          // but a preemptive boolean value wont.
          // Doing this saves us from setting the value to false after a success and making redundant the refresh request
          setError({});
        }
      }
    };
    getData();
  }, [token /** dependencies so that it always retries after token is set */]);
  // Here you'd return an array of routes
  return (
    <Discover
      playlists={playlists.items ?? []}
      newReleases={newReleases.items ?? []}
      categories={categories.items ?? []}
    />
  );
}
