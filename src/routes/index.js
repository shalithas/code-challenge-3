import React, { useEffect, useState } from "react";
import config from "../config";
import Discover from "./Discover";

export default function Routes() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
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

  // Here you'd return an array of routes
  return <Discover />;
}
