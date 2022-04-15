import getBearerToken from './getBearerToken';

const getFeaturedPlaylist = async () => {
    //  Using API Path featured-playlists
    const featuredPlaylists = await getBearerToken("featured-playlists");
    return featuredPlaylists.data.playlists.items;
  };

export default getFeaturedPlaylist;