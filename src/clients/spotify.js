import http from 'axios';
import _ from 'lodash';

export default class SpotifyClient {
  constructor() {    
    this.token = 'BQCehOp6raW9D3l2AtPsRu1Q7yRXCOyzmh84vVXD9jHMufzXrNUiwdKz7gok_0kizvVBYomFBYocETzqD5LaKNEX-SK5vJtA6sfz1JJ3ujyHpSQbuo6fte9Mc1nFmN86qXrrgP8dCgISy3y3-2BNs7bVYVsBicvlzg'
  }

  _get(options) {
    let me = this;
    let o = _.extend({}, me.baseOptions, options);
    return new Promise(function(resolve, reject) {
      http({
        url: o.url,
        method: 'get',
        headers: o.headers,
        params: o.params,
        responseType: 'json'
      })
      .then(json => {
        resolve(json.data);
      })
      .catch(response => {
        if(!me.handleErrorResponse(response))
        {
          reject(response);
        }
      })
    })
  }

  getNewRelease() {
    let url = "https://api.spotify.com/v1/browse/new-releases";
    
    let options = {
      url: url,
      headers: { Authorization: `Bearer ${this.token}` }
    }
    return this._get(options);
  }

  getFeaturedPlaylist() {
    let url = "https://api.spotify.com/v1/browse/featured-playlists";
    
    let options = {
      url: url,
      headers: { Authorization: `Bearer ${this.token}` }
    }
    return this._get(options);
  }

  getCategories() {
    let url = "https://api.spotify.com/v1/browse/categories";
    
    let options = {
      url: url,
      headers: { Authorization: `Bearer ${this.token}` }
    }
    return this._get(options);
  }

}