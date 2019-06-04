
const glob = require('glob');

function getEntry(globPath) {
  const entries = {};
  glob.sync(globPath).forEach((entry) => {
    const tmp = entry.split('/').splice(-3);
    entries[tmp[1]] = {
      entry: `src/${tmp[1]}/main.js`,
      template: `src/${tmp[1]}/index.html`,
      filename: `${tmp[1]}.html`,
      chunks: ['chunk-libs', tmp[1]],
    };
  });
  return entries;
}

const port = 9092; // dev port
const pages = getEntry('./src/**?/*.html');

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pages,
  devServer: {
    port,
    disableHostCheck: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: null,
    before: (app) => {
      app.get('/', (req, res) => {
        for (const i in pages) {
          res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
        }
        res.end();
      });
    },
  },
  chainWebpack(config) {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map'));

    config
      .when(process.env.NODE_ENV !== 'development',
        (config) => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/,
            }])
            .end();
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial', // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                },
              },
            });
          config.optimization.runtimeChunk('single');
        });
  },
};
