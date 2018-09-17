const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'analyse.js'
    },
    mode: 'development'
};
