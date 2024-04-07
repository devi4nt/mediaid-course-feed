const path = require("path");
module.exports = (env) => {
  console.log(env);
  const webPackConfig = {
    entry: "./src/index.ts",
    output: {
      filename: "bundle.min.js",
      path: path.resolve("dist"),
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        { test: /\.hbs/, loader: "handlebars-loader" },
      ],
    },
  };
  return webPackConfig;
};

// //@ts-check
// const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// module.exports = env => {
//     // use the --env.production switch to switch between development & production builds
//     const isProduction = env.production === true;

//     if (!isProduction) {
//         console.warn('running in DEVELOPMENT mode');
//     }

//     const webPackConfig = {
//         entry: './src/index.ts',
//         devtool: isProduction ? undefined : 'inline-source-map',
//         mode: isProduction ? 'production' : 'development',
//         watch: isProduction ? false : true,
//         module: {
//             rules: [
//                 {
//                     test: /\.ts$/,
//                     use: 'ts-loader',
//                     exclude: /node_modules/
//                 },
//                 { test: /\.hbs/, loader: 'handlebars-loader' }
//             ]
//         },
//         resolve: {
//             extensions: ['.ts', '.js']
//         },
//         output: {
//             filename: 'bundle.min.js',
//             path: path.resolve('dist')
//         }
//     };

//     // setup uglifyJS for production builds
//     if (isProduction) {
//         webPackConfig.optimization = {
//             minimizer: [new UglifyJsPlugin()]
//         };
//     }

//     return webPackConfig;
// };
