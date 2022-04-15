import axios from 'axios';

export const postRequest = async (url, payload, config) => {
    const { data } = await axios.post(url, payload, config)
    return data
}

export const getRequest = async (url, config) => {
    const { data } = await axios.get(url, config)
    return data
}
