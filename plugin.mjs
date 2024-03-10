import { resolve } from 'path'

export class TestPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: this.constructor.name
                },
                async () => {
                    const src = resolve('./example.ts')
                    console.log(src)
                    compilation.fileDependencies.add(src)

                    const assets = compilation.getAssets()
                    console.log(assets)
                }
            )
        })
    }
}
