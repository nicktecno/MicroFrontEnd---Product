const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const withImages = require("next-images");

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif", "svg"],
  webpack(config, options) {
    return config;
  },
});

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: pluginOptions.options,
        },
      ],
    });

    return config;
  },
};

const nextConfig = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = {
      topLevelAwait: true,
      asyncWebAssembly: true,
      layers: true,
    };
    config.plugins.push(
      new NextFederationPlugin({
        name: "productPage",
        remotes: {
          layout: `layout@https://micro-front-layout.vercel.app//_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          loginPage: `loginPage@https://micro-front-login.vercel.app/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          homePage: `homePage@https://micro-front-home.vercel.app/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          generalProductCards: `generalProductCards@https://micro-front-search-k5g1.vercel.app//_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./productPage": "./PagesComponents/Product/Product.jsx",
          "./otherOffers": "./PagesComponents/OtherOffers/OtherOffers.jsx",
        },

        extraOptions: {
          exposePages: true,
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
