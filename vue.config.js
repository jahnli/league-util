const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");
const Components = require("unplugin-vue-components/webpack");
const AutoImport = require("unplugin-auto-import/webpack");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload-process/preload.js"
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        dts: "src/auto-imports.d.ts",
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // global imports to register
        imports: ["vue", "vue-router", "@vueuse/core"],
        resolvers: [NaiveUiResolver()]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
});
