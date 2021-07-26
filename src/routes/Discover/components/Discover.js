import React, { Component } from "react";
import axios from "axios";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import config from "../../../config";
import "../styles/_discover.scss";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  fetchItems = (token, url, type) => {
    axios
      .get(config.api.baseUrl + "/browse/" + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        let items = [];
        switch (type) {
          case "newReleases":
            items = res.data.albums.items;
            break;
          case "playlists":
            items = res.data.playlists.items;
            break;
          case "categories":
            items = res.data.categories.items;
            break;
          default:
            items = [];
        }
        this.setState({
          ...this.state,
          [type]: items,
        });
      });
  };

  async componentDidMount() {
    const token = await axios(config.api.authUrl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(config.api.clientId + ":" + config.api.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    });
    // firing all api independently
    this.fetchItems(token.data.access_token, "new-releases", "newReleases");
    this.fetchItems(token.data.access_token, "featured-playlists", "playlists");
    this.fetchItems(token.data.access_token, "categories", "categories");
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
