import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss"; 
import SpotifyService from "../service/spotifyService";
export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }
  componentDidMount() {
    SpotifyService.newreleases().then(
      (response) => {
        this.setState({ newReleases: response.albums.items });
      },
      (error) => {
        if (error.response) {
          console.log(error.response)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('something went wrong')
        }
      }
    );

    SpotifyService.featuredplaylists().then(
      (response) => {
        this.setState({ playlists: response.playlists.items });
      },
      (error) => {
        if (error.response) {
          console.log(error.response)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('something went wrong')
        }
      }
    );
    SpotifyService.categories().then(
      (response) => {
        this.setState({ categories: response.categories.items });
      },
      (error) => {
        if (error.response) {
          console.log(error.response)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('something went wrong')
        }
      }
    );
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
