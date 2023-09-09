// .storybook/main.js
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // story 파일들의 경로를 설정 (main.js의 상대적 경로로 지정)
  stories: ['../src/**/*.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // storybook addon(스토리북 제공 기능) 설정 배열
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    'storybook-addon-react-router-v6',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          injectStoryParameters: false,
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
  // react를 사용
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      ...config.resolve.plugins.push(new TsconfigPathsPlugin({})),
    },
  }),
};
