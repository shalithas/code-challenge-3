
export const discoveryData = (state = {}, action) => {
    switch(action.type) {
        case 'CATEGORIES':
            return {
                ...state,
                categoriesList: [...action.data]
            };
        case 'FEATURE_PLAY_LIST':
            return {
                ...state,
                featurePlayList: [...action.data]
            };
        case 'NEW_RELEASE':
        return {
            ...state,
            newReleases: [...action.data]
        };
        default:
            return state;
    }
}