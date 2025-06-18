export default ({ config }) => ({
  ...config,
  extra: {
    STRAPI_API_URL: 'http://localhost:1337', // <-- hardcoded
    STRAPI_API_TOKEN: '0979e8429f743288c091f4b44803f43c5478ca2a73c95e7fb845cab85e5dedb848b0c138c37a957bca3a506376fd0fdca445deb6b2c22fa8088dd302210fbcdf39ca1cca999d0c62ee70ec4a208f3a347acd00a1d6c4fbb9e3446bcbd15734f82ca0968a437ebc0cbf54bc0e2c22cfd0c1f248d2a8deed07aadb801cdc0fb822',        // <-- hardcoded
  },
});