import getBearerToken from './getBearerToken';

const getBrowsedGenres = async () => {
    //  Using API Path categories
    const releases = await getBearerToken("categories");
    return releases.data.categories.items;
  };

export default getBrowsedGenres;