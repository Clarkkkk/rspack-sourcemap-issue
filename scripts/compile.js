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
                    const group = compilation.namedChunkGroups.get('main')
                    const assetNames = []
                    for (const chunk of group.chunks) {
                        assetNames.push(...getNamesOfAssetsInChunk(chunk))
                    }
                    console.log(assetNames)
                }
            )
        })
    }
}

function getNamesOfAssetsInChunk(chunk) {
    const assetNames = []

    assetNames.push(...chunk.files)

    if (chunk.auxiliaryFiles) {
        assetNames.push(...chunk.auxiliaryFiles)
    }

    return assetNames
}

function run() {
    const config = {
        mode: 'production',
        entry: {
            main: path.resolve(__dirname, '../src/splitChunksEntry.mjs')
        },
        optimization: {
            minimize: false,
            splitChunks: {
                chunks: 'all'
            }
        },
        output: {
            filename: '[chunkhash].js',
            path: path.resolve(__dirname, '../rspack-dist')
        },
        plugins: [
            new TestPlugin()
        ]
    }

    const compiler = webpack(config)
    compiler.run((webpackError, stats) => {
        // console.log(webpackError)
        // const statsJson = stats.toJson('verbose')
        // console.log(statsJson.errors)
    });
}

run()
