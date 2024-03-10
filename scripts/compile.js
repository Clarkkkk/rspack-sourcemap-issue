const path = require('path')
const rspack = require('@rspack/core')
const webpack = require('webpack')

class TestPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: this.constructor.name
                },
                async () => {
                    console.log(compilation.namedChunks.get('main'))
                }
            )
        })
    }
}

function run() {
    const config = {
        mode: 'production',
        entry: {
            main: path.resolve(__dirname, '../src/splitChunksEntry.js')
        },
        optimization: {
            minimize: false,
            splitChunks: {
                chunks: 'all'
            }
        },
        output: {
            path: path.resolve(__dirname, '../rspack-dist')
        },
        plugins: [
            new TestPlugin()
        ]
    }

    const compiler = webpack(config)
    compiler.run((webpackError, stats) => {
        // console.log(webpackError)
        const statsJson = stats.toJson('verbose')
        // console.log(statsJson.errors)
    });
}

run()
