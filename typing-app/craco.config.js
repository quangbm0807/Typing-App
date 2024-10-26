const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js',
                publicPath: '/Typing-App/',
            };
            return webpackConfig;
        },
    },
};
