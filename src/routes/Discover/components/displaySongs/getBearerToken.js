import axios from 'axios';
import config from '../../../../config';

/**
 * POST call for authorization token
 */

async function getBearerToken(param) {
    /**
     * Creating header parameters with bearer token
     * For Spotify API the token should be sent in Base 64 else it will throw 400 error
     */
    const headerParams = {
        headers: {
            Authorization: `Basic  ${btoa(`${config.api.clientId}:${config.api.clientSecret}`)}`
        }
    };

    //  grant_type mandatory for using spotify outside the context of user
    const bearerToken = await axios.post(config.api.authUrl, 'grant_type=client_credentials', headerParams);
    const bearerTokenVal = bearerToken.data.access_token;

    // GET helper function for: new-releases, featured playlists, browsing genres call
    const getPlaylists = await axios.get(`${config.api.baseUrl}/browse/${param}`,
        {
            headers: { Authorization: `Bearer ${bearerTokenVal}` },
        });
        
    return getPlaylists;
}

export default getBearerToken;