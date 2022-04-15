import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import api from '../../../config';
import { postRequest, getRequest } from '../../../services';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    const { api: { authUrl, baseUrl, newReleasesUrl, featuredPlaylistsUrl, categoriesUrl } } = api
    // Fetching client id and client secret from environment variables
    const postRequestConfig = {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`).toString('base64')
      }
    }
    // Post Call to get the Auth token
    postRequest(authUrl, '', postRequestConfig).then(data => {
      const accessToken = data.access_token
      const getRequestConfig = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        }
      }
      // Get Calls for each of the sections
      getRequest(`${baseUrl}${newReleasesUrl}`, getRequestConfig).then(data => this.setState({ newReleases: data?.albums.items }))
      getRequest(`${baseUrl}${featuredPlaylistsUrl}`, getRequestConfig).then(data => this.setState({ playlists: data?.playlists.items }))
      getRequest(`${baseUrl}${categoriesUrl}`, getRequestConfig).then(data => this.setState({ categories: data?.categories.items }))
    }).catch(error => console.log(error))
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
