import axios from "axios";
import config from "../config";

const {api:{clientId, clientSecret, baseUrl} = {}} = config || {}
const headers = {
    Authorization: `Bearer  ${clientSecret}`
}
class SpootifyService {
    async get(service_type) {
        if(baseUrl) {
            try {
                const {data} = await axios.get(`${baseUrl}/browse/${service_type}`, { headers });
                return data;
            } catch (e) {
                console.error('Network error', e);
            }
           
        }
        return null;
    }
}

export default new SpootifyService();