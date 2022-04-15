export const createPostRequestConfig = (clientId, clientSecret) => {
    return {
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        }
    }
}

export const createGetRequestConfig = (token) => {
    return {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
}
