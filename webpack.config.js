const path = require("path");

module.exports = {
  entry: [
    "./js/helpersModule.js",
    "./js/filters.js",
    "./js/backend.js",
    "./js/picture.js",
    "./js/preview.js",
    "./js/form.js",
    "./js/gallery.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
