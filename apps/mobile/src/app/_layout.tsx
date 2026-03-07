import { ThemeProvider, useTheme } from '@/lib/theme-context';
import * as Device from 'expo-device';
import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../../assets/css/global.css';

function AppStack() {
  const { effectiveScheme, colors } = useTheme()
  return (
    <>
      <StatusBar style={effectiveScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="blog/[slug]"
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  useEffect(() => {
    const isTablet = Device.deviceType === Device.DeviceType.TABLET;
    if (isTablet) {
      ScreenOrientation.unlockAsync();
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  }, []);

  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  )
}
