const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// Exclude web app's node_modules to avoid file map conflicts in monorepo
config.resolver.blockList = [
  /apps\/web\/node_modules\/.*/,
]

module.exports = withNativeWind(config, { input: './assets/css/global.css' })