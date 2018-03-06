const pathTo = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const entry = {}
const weexEntry = {}
const vueWebTemp = 'temp'
const hasPluginInstalled = fs.existsSync('./web/plugin.js')
var isWin = /^win/.test(process.platform)

function getEntryFileContent (entryPath, vueFilePath) {
    let relativePath = pathTo.relative(pathTo.join(entryPath, '../'), vueFilePath)
    let contents = ''
    if (hasPluginInstalled) {
        const plugindir = pathTo.resolve('./web/plugin.js')
        contents = 'require(\'' + plugindir + '\') \n'
    }
    if (isWin) {
        relativePath = relativePath.replace(/\\/g, '\\\\')
    }
    contents += 'var App = require(\'' + relativePath + '\')\n'
    contents += 'App.el = \'#root\'\n'
    contents += 'new Vue(App)\n'
    return contents
}

var fileType = ''

function walk (dir) {
    dir = dir || '.'
    const directory = pathTo.join(__dirname, 'src', dir)
    fs.readdirSync(directory)
        .forEach((file) => {
            const fullpath = pathTo.join(directory, file)
            const stat = fs.statSync(fullpath)
            const extname = pathTo.extname(fullpath)
            if (stat.isFile() && extname === '.vue' || extname === '.we') {
                if (!fileType) {
                    fileType = extname
                }
                if (fileType && extname !== fileType) {
                    console.log('Error: This is not a good practice when you use ".we" and ".vue" togither!')
                }
                const name = pathTo.join(dir, pathTo.basename(file, extname))
                if (extname === '.vue') {
                    const entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + '.js')
                    fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath))

                    entry[name] = pathTo.join(__dirname, entryFile) + '?entry=true'
                }
                if (fullpath.includes('/views')) {
                    weexEntry[name] = fullpath + '?entry=true'
                }
            } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
                const subdir = pathTo.join(dir, file)
                walk(subdir)
            }
        })
}

walk()

const plugins = [
    new webpack.BannerPlugin({
        banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
        raw: true,
        exclude: 'Vue'
    })
]

const weexConfig = {
    entry: weexEntry,
    output: {
        path: pathTo.join(__dirname, 'dist'),
        filename: '[name].weex.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }],
                include: [
                    pathTo.resolve(__dirname, 'src/'),
                    pathTo.resolve(__dirname, 'node_modules/wxos-widget/')
                ]
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader'
                }]
            },
            {
                test: /\.we(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader'
                }]
            }
        ]
    },
    resolve: {
        alias: {
            config: pathTo.resolve(__dirname, 'src/config')
        }
    },
    plugins: plugins
}

if (process.env.NODE_ENV === 'production') {
    plugins.unshift(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
    )
}

module.exports = weexConfig
