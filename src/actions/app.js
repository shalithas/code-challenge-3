
import { ACTION_TYPES, path } from 'constant';


export const fetchList = () => async dispatch => {
    // async calls
    dispatch(getReleased());
    dispatch(getFeatured());
    dispatch(getBrowse());
}

// api for getting released song 
const getReleased = () => async(dispatch,getState) => {
    try {
        const token = getState().auth?.token;
        dispatch({type:ACTION_TYPES.RELEASED_REQUEST})
        const release = await request(`${path.base}${path.release}`,token);
        if(release.error){
            dispatch({type:ACTION_TYPES.SET_SPOTIFY_TOKEN, payload:null});
            dispatch({type:ACTION_TYPES.FEATURED_FAILED});
        } else
        dispatch({type:ACTION_TYPES.RELEASED_SUCCESS, payload:release?.albums?.items})
    } catch (error) {
        console.log("released catch error ",error)
        dispatch({type:ACTION_TYPES.RELEASED_FAILED})
    }
}
// api for getting featured song 
const getFeatured = () => async(dispatch,getState) => {
    try {
        const token = getState().auth?.token;
        dispatch({type:ACTION_TYPES.FEATURED_REQUEST})
        const featured = await request(`${path.base}${path.featured}`,token);
        if(featured.error){
            dispatch({type:ACTION_TYPES.SET_SPOTIFY_TOKEN, payload:null});
            dispatch({type:ACTION_TYPES.FEATURED_FAILED});
        } else
        dispatch({type:ACTION_TYPES.FEATURED_SUCCESS, payload:featured?.playlists?.items})
    } catch (error) {
        dispatch({type:ACTION_TYPES.FEATURED_FAILED})
    }   
}
// api for getting categories  
const getBrowse = () => async(dispatch,getState) => {
    try {
        const token = getState().auth?.token;
        dispatch({type:ACTION_TYPES.BROWSE_REQUEST})
        const categories = await request(`${path.base}${path.categories}`,token);
        if(categories.error){
            dispatch({type:ACTION_TYPES.SET_SPOTIFY_TOKEN, payload:null});
            dispatch({type:ACTION_TYPES.FEATURED_FAILED});
        } else
        dispatch({type:ACTION_TYPES.BROWSE_SUCCESS,payload:categories?.categories?.items})
    } catch (error) {
        dispatch({type:ACTION_TYPES.BROWSE_FAILED})
    }
}
const request = async(url,token) => {
    const headers = {Authorization: `Bearer ${token}`};
    return await (await fetch(url,{headers})).json();
}
export const setToken = token => dispatch => dispatch({type:ACTION_TYPES.SET_SPOTIFY_TOKEN, payload:token})