import { ExpoConfig } from 'expo/config';
import packageJson from './package.json';

const variant = process.env.APP_VARIANT ?? 'production';
const isDev = variant === 'development';
const isPreview = variant === 'preview';

const appName = isDev ? '小黑屋 Dev' : isPreview ? '小黑屋 Preview' : '晓千烁的小黑屋';

const bundleId = isDev
  ? 'work.qlqs.blog.dev'
  : isPreview
    ? 'work.qlqs.blog.preview'
    : 'work.qlqs.blog';

const config: ExpoConfig = {
  name: appName,
  slug: 'blog',
  version: packageJson.version,
  orientation: 'default',
  icon: isDev
    ? './assets/images/icon-dark.png' // 用深色图标方便区分开发包
    : './assets/images/icon.png',
  scheme: 'blog',
  userInterfaceStyle: 'automatic',
  ios: {
    icon: isDev
      ? {
          light: './assets/images/icon-dark.png',
          dark: './assets/images/icon-dark.png',
          tinted: './assets/images/icon-tinted.png',
        }
      : {
          light: './assets/images/icon.png',
          dark: './assets/images/icon-dark.png',
          tinted: './assets/images/icon-tinted.png',
        },
    bundleIdentifier: bundleId,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: bundleId,
    permissions: [],
    icon: isDev ? './assets/images/icon-dark.png' : './assets/images/icon.png',
    adaptiveIcon: isDev
      ? undefined
      : {
          backgroundColor: '#74C0FF',
          foregroundImage: './assets/images/android-icon-foreground.png',
          backgroundImage: './assets/images/android-icon-background.png',
          monochromeImage: './assets/images/android-icon-monochrome.png',
        },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    'expo-screen-orientation',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#74C0FF',
        image: './assets/images/splash-icon.png',
        dark: {
          image: './assets/images/splash-icon.png',
          backgroundColor: '#1E1E1E',
        },
        imageWidth: 200,
      },
    ],
    '@react-native-async-storage/expo-with-async-storage',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    appVariant: variant,
    router: {},
    eas: {
      projectId: 'fc8d6501-d05d-40e6-af69-383df7b0dd0f',
    },
  },
};

export default config;
