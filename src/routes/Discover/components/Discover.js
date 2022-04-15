import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { getNewReleases, getFeaturedPlaylist, getBrowsedGenres } from './displaySongs';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount = async () => {
    //  Getting respective data to be set
    const releases = await getNewReleases();
    const featuredPlayLists = await getFeaturedPlaylist();
    const browsedGenres = await getBrowsedGenres();

    //  Setting State to update the UI
    this.setState({
      newReleases: releases,
      playlists: featuredPlayLists,
      categories: browsedGenres
    });

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
