import { ThemeProvider, useTheme } from '@/lib/theme-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  )
}
