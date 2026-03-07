import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';
import { Tabs } from 'expo-router';
import { Platform, Text, View } from 'react-native';

function TabIcon({ focused, icon, label, color }: { focused: boolean; icon: string; label: string; color: string }) {
  return (
    <View className='items-center justify-center gap-0.5'>
      <Text className={cn(['text-lg', focused ? 'color-accent' : 'color-text-light'])}>{icon}</Text>
      {Platform.OS === 'web' && (
        <Text style={{ color }} className='text-[10px] tracking-[0.5px] font-medium'>{label}</Text>
      )}
    </View>
  )
}

export default function TabsLayout() {
  const { colors } = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: Platform.OS !== 'web',
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.bgCard,
          borderTopColor: colors.borderLight,
          borderTopWidth: 1,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          letterSpacing: 0.5,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} icon="◎" label="首页" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: '文章',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} icon="≡" label="文章" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '关于',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} icon="○" label="关于" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
