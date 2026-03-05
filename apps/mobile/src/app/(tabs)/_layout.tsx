import { Tabs } from 'expo-router'
import { Platform, View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/lib/theme-context'

function TabIcon({ focused, icon, label }: { focused: boolean; icon: string; label: string }) {
  const { colors } = useTheme()
  return (
    <View style={tabStyles.iconWrapper}>
      <Text style={[tabStyles.icon, { color: focused ? colors.accent : colors.textLight }]}>{icon}</Text>
    </View>
  )
}

export default function TabsLayout() {
  const { colors } = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
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
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="◎" label="首页" />
          ),
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: '文章',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="≡" label="文章" />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '关于',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="○" label="关于" />
          ),
        }}
      />
    </Tabs>
  )
}

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
})
