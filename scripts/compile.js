const path = require('path')
const rspack = require('@rspack/core')

function run() {
    const config = {
        mode: 'production',
        entry: path.resolve(__dirname, '../src/index.js'),
        output: {
            path: path.resolve(__dirname, '../rspack-dist')
        },
        plugins: [
            new rspack.CopyRspackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../public'),
                        to: path.resolve(__dirname, '../rspack-dist')
                    }
                ]
            })
        ]
    }

    const compiler = rspack(config)
    compiler.run((webpackError, stats) => {
        console.log(webpackError)
        const statsJson = stats.toJson('verbose')
        console.log(statsJson.errors)
    });
}

run()
