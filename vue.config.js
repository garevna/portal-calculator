// const Dotenv = require('dotenv-webpack')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '.'
      }
    }
    // plugins: [new Dotenv()]
  },
  pwa: {
    themeColor: '#83332C',
    msTileColor: '#FAFAFA'
  },
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/calculator/'
    : '/'
}
