/* eslint-disable @typescript-eslint/no-var-requires */
// carco.config.js

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@components': path.resolve(__dirname, 'src/common/components'),
      '@styles': path.resolve(__dirname, 'src/common/styles'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};
