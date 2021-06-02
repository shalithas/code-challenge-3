import config from '../config';

export const getAuthToken = async () => {
    const result = await fetch(config.api.authUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(config.api.clientId + ':' + config.api.clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

export const fetchAllSongs = async (token) => {
    const playlists = await getFeaturedPlaylist(token);
    const newReleases = await getNewReleases(token);
    const categories = await getCategories(token);
    return {
        newReleases,
        playlists,
        categories
    };
}

export const constructRequestOptions = (endpoint, token) => {
    return fetch(`${config.api.baseUrl}/browse/${endpoint}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
}

export const getFeaturedPlaylist = async (token) => {
    const response = await constructRequestOptions("featured-playlists", token);
    const data = await response.json();
    return data.playlists.items;
}

export const getNewReleases = async (token) => {
    const response = await constructRequestOptions("new-releases", token);
    const data = await response.json();
    return data.albums.items;
}

export const getCategories = async (token) => {
    const response = await constructRequestOptions("categories", token);
    const data = await response.json();
    return data.categories.items;
}