const format = ['_REQUEST', '_COMPLETE', '_SUCCESS', '_FAILED'];
const types = ["RELEASED","FEATURED","BROWSE"
];

const manuals = {
  SET_SPOTIFY_TOKEN:'SET_SPOTIFY_TOKEN'
};

export default {
  ...types
    .map(t => format.map(i => `${t}${i}`))
    .flat(1)
    .reduce((obj, v) => {
      obj[v] = v;
      return obj;
    }, {}),
  ...manuals,
};