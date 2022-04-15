import getBearerToken from './getBearerToken';

const getNewReleases = async () => {
    //  Using API Path new-releases
    const releases = await getBearerToken("new-releases");
    return releases.data.albums.items;
  };

export default getNewReleases;