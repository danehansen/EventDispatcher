const path = require("path");

module.exports = {
  entry: {
    app: "./src/EventDispatcher.js"
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: "danehansen-EventDispatcher.min.js",
    library: ["danehansen", "EventDispatcher"],
    libraryTarget: "umd",
    path: __dirname,
  }
};
