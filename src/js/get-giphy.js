// Get your key @ https://developers.giphy.com/
const GIPHY_API_KEY = 'dc6zaTOxFJmzC'; // random key. Get your own!

// Giphy API defaults
const API = {
  baseURL: 'https://api.giphy.com/v1/',
  resource: 'gifs',
  key: GIPHY_API_KEY,
  tag: 'pizza',
  type: 'random',
  rating: 'R' // ?
};

// https://api.giphy.com/v1/gifs/random?api_key=<:KEY>&tag=pizza&rating=G
const giphyEndpoint = encodeURI(
  `${API.baseURL}${API.resource}/${API.type}`
  + `?api_key=${API.key}`
  + `&tag=${API.tag}`
  + `&rating=${API.rating}`
);

export default () => {
  console.log('🍕 #ftw / thx Giphy 💖');

  return fetch(giphyEndpoint)
    .then(res => res.json())
    .then(json => json.data)
    .catch(err => new Error(err));
};
