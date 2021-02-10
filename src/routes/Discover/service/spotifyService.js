import axios from "axios";
import config from "../../../config";

const headers = {
  Authorization: `Bearer  ${config.api.clientSecret}`,
};
class SpotifyService {
  newreleases() {
    return axios
      .get(`${config.api.baseUrl}/browse/new-releases`, { headers: headers })
      .then((response) => {
        return response.data;
      });
  }
  featuredplaylists() {
    return axios
      .get(`${config.api.baseUrl}/browse/featured-playlists`, { headers: headers })
      .then((response) => {
        return response.data;
      });
  }
  categories() {
    return axios
      .get(`${config.api.baseUrl}/browse/categories`, { headers: headers })
      .then((response) => {
        return response.data;
      });
  }
}

export default new SpotifyService();
