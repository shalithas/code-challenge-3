export const newReleases = (state = [], action) => {
    switch(action.type) {
        case 'NEW_RELEASE':
            return [...state, ...action.data];
        default:
            return state;
    }
}


export const featurePlayList = (state = [], action) => {
    switch(action.type) {
        case 'FEATURE_PLAY_LIST':
            return [...state, ...action.data];
        default:
            return state;
    }
}

export const categoriesList = (state = [], action) => {
    switch(action.type) {
        case 'CATEGORIES':
            return [...state, ...action.data];
        default:
            return state;
    }
}