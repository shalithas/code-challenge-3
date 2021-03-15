import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { connect } from 'react-redux';
import { getNewReleases, getFeaturedPlaylist, getCategories } from '../../../dispatchers/songs';

class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    this.props.getNewReleases();
    this.props.getFeaturedPlaylist();
    this.props.getCategories();
  }

  render() {
    const { newReleases, playlists, categories } = this.props;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    newReleases: (state.newRelease && state.newRelease.response) || [],
    playlists: (state.featuredPlayList && state.featuredPlayList.response) || [],
    categories: (state.categories && state.categories.response) || []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {    
    getNewReleases: () => dispatch(getNewReleases()),
    getFeaturedPlaylist: () => dispatch(getFeaturedPlaylist()),
    getCategories: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);