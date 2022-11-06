/**
 * @type {import('postcss').AcceptedPlugin}
 */
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-lightningcss")({
      browsers: ">= .25%",
      lightningcssOptions: {
        minify: process.env.NODE_ENV === "production",
        sourceMap: true,
        cssModules: false,
        import: false,
      },
    }),
  ],
};
