// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].title = 'Find Coach App';
      return args;
    });
  },
  devServer: { port: 3000 },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/ui/loading.scss";
          @import "@/assets/scss/global/index.scss";
          @import "@/assets/scss/global/_variables.scss";
        `,
      },
    },
  },
};
