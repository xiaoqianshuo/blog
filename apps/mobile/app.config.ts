import { ExpoConfig } from 'expo/config';
import packageJson from './package.json';

const config: ExpoConfig = {
  name: '晓千烁的小黑屋',
  slug: 'blog',
  version: packageJson.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'blog',
  userInterfaceStyle: 'automatic',
  ios: {
    icon: {
      light: './assets/images/icon.png',
      dark: './assets/images/icon-dark.png',
      tinted: './assets/images/icon-tinted.png',
    },
    bundleIdentifier: 'work.qlqs.blog',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: 'work.qlqs.blog',
    permissions: [],
    adaptiveIcon: {
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
    router: {},
    eas: {
      projectId: 'fc8d6501-d05d-40e6-af69-383df7b0dd0f',
    },
  },
};

export default config;
