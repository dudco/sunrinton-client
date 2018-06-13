const path = require('path');
const webpack = require('webpack');
// const rewireLess = require('react-app-rewire-less');
const { getLoader, loaderNameMatches } = require("react-app-rewired");

module.exports = (config, env) => {
    const lessExtension = /\.less$/;

    const fileLoader = getLoader(
        config.module.rules,
        rule => loaderNameMatches(rule, 'file-loader')
    );
    fileLoader.exclude.push(lessExtension);

    const cssRules = getLoader(
        config.module.rules,
        rule => String(rule.test) === String(/\.css$/)
    );

    // cssRules.use[1].options['modules'] = true
    // cssRules.use[1].options['localIdentName'] = '[name]_[local]_[hash:base64:5]'
    // config.plugins.push(new webpack.WatchIgnorePlugin([ /css\.d\.ts$/ ]))

    let lessRules;
    if (env === "production") {
        lessRules = {
            test: lessExtension,
            loader: [
                // TODO: originally this part is wrapper in extract-text-webpack-plugin
                //       which we cannot do, so some things like relative publicPath
                //       will not work.
                //       https://github.com/timarney/react-app-rewired/issues/33
                cssRules.loader[0],
                cssRules.loader[1],
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        minimize: true,
                    }
                },
                { loader: "less-loader", options: {} }
            ]
        };
    } else {
        lessRules = {
            test: lessExtension,
            use: [
                cssRules.use[0],
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        minimize: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                },
                { loader: "less-loader", options: {} }
            ]
        };
    }

    const oneOfRule = config.module.rules.find((rule) => rule.oneOf !== undefined);
    if (oneOfRule) {
        oneOfRule.oneOf.unshift(lessRules);
    }
    else {
        // Fallback to previous behaviour of adding to the end of the rules list.
        config.module.rules.push(lessRules);
    }

    // config = rewireLess.withLoaderOptions({modules: true, localIdentName: '[name]_[local]_[hash:base64:5]'})(config, env);
    return config
}