import ACTIONS from '../actions/action-types';
import SpotifyClient from '../clients/spotify';
import _ from 'lodash';

const { SONGS } = ACTIONS;

const reqNewReleases = () => {
  return {
    type: SONGS.GET_NEW_RELEASE.INIT    
  }
}

const reqNewReleasesSuccess = (response) => {
  return {
    type: SONGS.GET_NEW_RELEASE.SUCCESS,
    response
  }
}

const reqNewReleasesFailed = (error) => {
  return {
    type: SONGS.GET_NEW_RELEASE.FAILED,
    error
  }
}
 
export const getNewReleases = (payload) => (dispatch) => {
  try {
    dispatch(reqNewReleases());
    const client = new SpotifyClient();
    return client.getNewRelease(payload)
      .then(response => {
        const albums = _.get(response, 'albums.items');
        dispatch(reqNewReleasesSuccess(albums));
      })
      .catch(error => {
        dispatch(reqNewReleasesFailed(error))
      });
  } catch (err) {
    dispatch(reqNewReleasesFailed(err))
    return Promise.reject(err);
  }
};

const reqCategories = () => {
  return {
    type: SONGS.GET_CATEGORIES.INIT    
  }
}

const reqCategoriesSuccess = (response) => {
  return {
    type: SONGS.GET_CATEGORIES.SUCCESS,
    response
  }
}

const reqCategoriesFailed = (error) => {
  return {
    type: SONGS.GET_CATEGORIES.FAILED,
    error
  }
}
 
export const getCategories = (payload) => (dispatch) => {
  try {
    dispatch(reqCategories());
    const client = new SpotifyClient();
    return client.getCategories(payload)
      .then(response => {
        const categories = _.get(response, 'categories.items');
        dispatch(reqCategoriesSuccess(categories));
      })
      .catch(error => {
        dispatch(reqCategoriesFailed(error))
      });
  } catch (err) {
    dispatch(reqCategoriesFailed(err))
    return Promise.reject(err);
  }
};

const reqFeaturedPlaylist = () => {
  return {
    type: SONGS.FEATURED_PLAY_LIST.INIT    
  }
}

const reqFeaturedPlaylistSuccess = (response) => {
  return {
    type: SONGS.FEATURED_PLAY_LIST.SUCCESS,
    response
  }
}

const reqFeaturedPlaylistFailed = (error) => {
  return {
    type: SONGS.FEATURED_PLAY_LIST.FAILED,
    error
  }
}
 
export const getFeaturedPlaylist = (payload) => (dispatch) => {
  try {
    dispatch(reqFeaturedPlaylist());
    const client = new SpotifyClient();
    return client.getFeaturedPlaylist(payload)
      .then(response => {
        const playlist = _.get(response, 'playlists.items');
        dispatch(reqFeaturedPlaylistSuccess(playlist));
      })
      .catch(error => {
        dispatch(reqFeaturedPlaylistFailed(error))
      });
  } catch (err) {
    dispatch(reqFeaturedPlaylistFailed(err))
    return Promise.reject(err);
  }
};
