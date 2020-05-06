const { primaryColor } = require('./src/config/colors');
const { readdirSync, statSync } = require('fs')
var fromEntries = require('object.fromentries');

const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra');

const path = require("path");
const { join } = path;

const getSubDirectories = target => readdirSync(target).filter(folder => statSync(join(target, folder)).isDirectory())

const aliases = [
    ...getSubDirectories('src').map(folder => [`@${folder}`, path.resolve(__dirname, `src/${folder}`)]),
    ...getSubDirectories('server').map(folder => [`@${folder}`, path.resolve(__dirname, `server/${folder}`)])
]

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': primaryColor
        },
    }),
    addWebpackAlias(fromEntries(aliases))
);