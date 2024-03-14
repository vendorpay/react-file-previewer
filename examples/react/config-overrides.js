const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    const alias = config.resolve.alias || {};
    Object.assign(alias, {
        process: 'process/browser',
        stream: "stream-browserify",
        zlib: "browserify-zlib"
    })
    Object.assign(fallback, {
        "path": require.resolve("path-browserify"),
    })
    config.resolve.fallback = fallback;
    config.resolve.alias = alias;
    config.plugins.push(new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
    }))
    return config;
}