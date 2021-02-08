export default {
  api: {
    baseUrl: 'https://api.spotify.com/v1',
    authUrl: 'https://accounts.spotify.com/api/token',
    clientId: 'fe7384ef90ea42669fbbbb8879064491',
    clientSecret: 'ecca7aafd4f2409da70783dbce3dded7',
    scopes:['user-read-email', 'user-read-private'],
    callbackURL:'http://localhost:3000/auth/spotify/callback'
  }
}
