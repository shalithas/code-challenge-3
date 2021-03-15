import ACTIONS from '../actions/action-types';

const { SONGS } = ACTIONS;

const songs = (state = {}, action) => {
  switch (action.type) {
    case SONGS.GET_NEW_RELEASE.INIT:
      return {
        ...state,
        isFetching: true,
        newRelease: {          
          status: null,
          error: null
        }
      }
    case SONGS.GET_NEW_RELEASE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        newRelease: {          
          response: action.response,
          status: 'success'
        }
      }
    case SONGS.GET_NEW_RELEASE.FAILED:
      return {
        ...state,
        isFetching: false,
        newRelease: {          
          status: 'failed',
          error: action.error
        }
      }
    case SONGS.FEATURED_PLAY_LIST.INIT:
      return {
        ...state,
        isFetching: true,
        featuredPlayList: {          
          status: null,
          error: null
        }
      }
    case SONGS.FEATURED_PLAY_LIST.SUCCESS:
      return {
        ...state,
        isFetching: false,
        featuredPlayList: {          
          response: action.response,
          status: 'success'
        }
      }
    case SONGS.FEATURED_PLAY_LIST.FAILED:
      return {
        ...state,
        isFetching: false,
        featuredPlayList: {          
          status: 'failed',
          error: action.error
        }
      }
    case SONGS.GET_CATEGORIES.INIT:
      return {
        ...state,
        isFetching: true,
        categories: {          
          status: null,
          error: null
        }
      }
    case SONGS.GET_CATEGORIES.SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: {          
          response: action.response,
          status: 'success'
        }
      }
    case SONGS.GET_CATEGORIES.FAILED:
      return {
        ...state,
        isFetching: false,
        categories: {          
          status: 'failed',
          error: action.error
        }
      }
    default:
      return state;
  }
}

export default songs;