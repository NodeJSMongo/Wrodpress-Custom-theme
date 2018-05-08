var path = require('path');

module.exports = {
  entry: {
    App:"./public/assets/scripts/App.js",
    vendor: "./public/assets/scripts/vendor.js",
    index: "./public/assets/scripts/index.js"
  },
  output:{
    path: path.resolve(__dirname, "./public/temp/scripts") ,
    filename: "[name].js"
  },
  module:{
    loaders:[
      {
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['react','es2015','env']
        }
      },
       { test: /\.(png|jpg)$/, loader: 'url-loader?limit=819209' }
    ]
  },
  resolve:{
    extensions:['.js','.jsx']
  }
}
