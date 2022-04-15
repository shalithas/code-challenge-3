import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import api from '../../../config';
import { postRequest, getRequest } from '../../../services';
import { createPostRequestConfig, createGetRequestConfig } from '../../../utils'

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
    const postRequestConfig = createPostRequestConfig(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET)
    // Post Call to get the Auth token
    postRequest(authUrl, '', postRequestConfig).then(data => {
      const accessToken = data?.access_token
      if (!accessToken) return;
      // Make Get Calls for each section only if we get the accessToken
      const getRequestConfig = createGetRequestConfig(accessToken)
      getRequest(`${baseUrl}${newReleasesUrl}`, getRequestConfig).then(data => this.setState({ newReleases: data?.albums.items })).catch(error => console.log(error))
      getRequest(`${baseUrl}${featuredPlaylistsUrl}`, getRequestConfig).then(data => this.setState({ playlists: data?.playlists.items })).catch(error => console.log(error))
      getRequest(`${baseUrl}${categoriesUrl}`, getRequestConfig).then(data => this.setState({ categories: data?.categories.items })).catch(error => console.log(error))
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
