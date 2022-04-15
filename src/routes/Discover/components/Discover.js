import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import axios from "axios"
import api from "../../../config"
const spotify = api.api;
export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }
  componentDidMount = async () => {
    await axios(`${spotify.authUrl}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.clientId + ':' + spotify.clientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
        axios(`${spotify.baseUrl}/new-releases`, {
          method: "GET",
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }

        })
          .then((newReleaseResponse) => {
            this.setState({ newReleases: newReleaseResponse.data.albums.items })
          })
        axios(`${spotify.baseUrl}/featured-playlists`, {
          method: "GET",
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }

        })
          .then((featuredListResponse) => {
            this.setState({ playlists: featuredListResponse.data.playlists.items })
          })
        axios(`${spotify.baseUrl}/categories`, {
          method: "GET",
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }

        })
          .then((categoriesResponse) => {
            this.setState({ categories: categoriesResponse.data.categories.items })
          })
      })

  }
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
