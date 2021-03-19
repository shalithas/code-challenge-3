import SpootifyService from "../../utils/SpootifyService";

export const getNewRelease = (data_type) => async (dispatch, getState) => {
    const {albums} = await SpootifyService.get(data_type) || {};
    dispatch({
        type: 'NEW_RELEASE',
        data: albums?.items?.map(({name, images}) => ({
            name,
            images
        })) || [],
    });

}

export const getFeaturePlaylist = (data_type) => async (dispatch, getState) => {
    const {playlists} = await SpootifyService.get(data_type) || {};
    dispatch({
        type: 'FEATURE_PLAY_LIST',
        data: playlists?.items?.map(({name, images}) => ({
            name,
            images
        })) || [],
    })
}

export const getcategories = (data_type) => async (dispatch, getState) => {
    const {categories} = await SpootifyService.get(data_type) || {};
    dispatch({
        type: 'CATEGORIES',
        data: categories?.items?.map(({name, icons}) => ({
            name,
            icons
        })) || [],
    });
}