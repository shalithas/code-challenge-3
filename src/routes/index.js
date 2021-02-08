import React, { useEffect, useState } from "react";
import config from "../config";
import Discover from "./Discover";

export default function Routes() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
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
  }, [error]);
  // Get Data from Spotify
  useEffect(() => {
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
          setError(true);
        }
      }
    };
    getData();
  }, [token]);
  // Here you'd return an array of routes
  return (
    <Discover
      playlists={playlists.items ?? []}
      newReleases={newReleases.items ?? []}
      categories={categories.items ?? []}
    />
  );
}
