import { useTheme, type DisplayMode } from '@/lib/theme-context'
import { themeLabels, type ThemeName } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { Linking, Pressable, ScrollView, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const skills = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Engineering', items: ['Monorepo', 'pnpm', 'CI/CD', 'Testing'] },
  { label: 'Interests', items: ['骑行', '摄影', '阅读', '旅行'] },
]

const links = [
  { label: 'GitHub', url: 'https://github.com/xiaoqianshuo', icon: '⌥' },
  { label: 'Homepage', url: 'http://xiaoqianshuo.work', icon: '◎' },
  { label: 'Email', url: 'mailto:xiaoqianshuo@163.com', icon: '✉' },
]

const modeOptions: { id: DisplayMode; icon: string; label: string }[] = [
  { id: 'auto',  icon: '◑', label: '自动' },
  { id: 'light', icon: '○', label: '亮色' },
  { id: 'dark',  icon: '●', label: '暗色' },
]

export default function AboutScreen() {
  const insets = useSafeAreaInsets()
  const { fonts, themeName, setTheme, mode, setMode } = useTheme()

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(0).springify().damping(20)} className="py-5 px-1">
        <Text className="text-[10px] tracking-[2.5px] uppercase mb-1.5 text-accent">About Me</Text>
        <Text style={{ fontFamily: fonts.serif }} className="text-[34px] font-bold tracking-[-0.8px] text-text-primary">
          关于我
        </Text>
      </Animated.View>

      {/* Profile card */}
      <Animated.View entering={FadeInDown.delay(80).springify().damping(18)} className="mb-4">
        <View className="rounded-2xl border border-border bg-bg-card p-6 items-center">
          <View className="w-[72px] h-[72px] rounded-full border-2 border-accent-mid bg-accent-pale items-center justify-center mb-3">
            <Text className='text-[32px]'>🌿</Text>
          </View>
          <Text style={{ fontFamily: fonts.serif }} className="text-[22px] font-bold mb-1 text-text-primary">
            晓千烁
          </Text>
          <Text className="text-xs tracking-[1.5px] mb-4 text-accent">Developer &amp; Writer</Text>
          <Text style={{ fontFamily: fonts.serif }} className="text-sm leading-[22px] text-center text-text-muted">
            你好，我是晓千烁，一名前端开发者，同时也是个业余写作者。{'\n\n'}
            我相信好的代码和好的文章在本质上是相通的：都需要清晰的思维、精准的表达，以及对细节的持续打磨。{'\n\n'}
            平时喜欢骑行、摄影和读书。骑行让我在运动中清空大脑，摄影训练我的观察力，读书则是我和不同时代的人对话的方式。
          </Text>
        </View>
      </Animated.View>

      {/* Quote */}
      <Animated.View entering={FadeInDown.delay(160).springify().damping(18)} className="mb-5">
        <View className="flex-row rounded-xl bg-bg-subtle p-4 gap-3">
          <View className="w-[3px] rounded-sm bg-accent-pale" />
          <Text style={{ fontFamily: fonts.serif }} className="flex-1 text-sm leading-[22px] italic text-text-muted">
            「时间是最好的编辑，{'\n'}　而写作是最诚实的自我审视。」
          </Text>
        </View>
      </Animated.View>
      {skills.map((group, gi) => (
        <Animated.View
          key={group.label}
          entering={FadeInDown.delay(gi * 60 + 220).springify().damping(18)}
          className="mb-5"
        >
          <Text className="text-[10px] tracking-[2px] uppercase mb-2.5 text-text-muted">{group.label}</Text>
          <View className="flex-row flex-wrap gap-2">
            {group.items.map((item) => (
              <View key={item} className="border border-border rounded-lg px-3 py-1.5 bg-bg-card">
                <Text className="text-[13px] tracking-[0.2px] text-text-primary">{item}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      ))}

      {/* Links */}
      <Animated.View entering={FadeInDown.delay(420).springify().damping(18)} className="mb-6">
        <Text className="text-[10px] tracking-[2px] uppercase mb-2.5 text-text-muted">Links</Text>
        <View className="rounded-xl border border-border bg-bg-card overflow-hidden">
          {links.map((link, i) => (
            <Pressable
              key={link.label}
              onPress={() => Linking.openURL(link.url)}
              className={cn("flex-row items-center px-4 py-3.5 gap-3 active:opacity-60", i < links.length - 1 && "border-b border-border-light")}
            >
              <Text className="text-sm w-5 text-center text-accent">{link.icon}</Text>
              <Text className="flex-1 text-sm tracking-[0.2px] text-text-primary">{link.label}</Text>
              <Text className="text-lg text-text-light">›</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* Appearance: Theme + Mode */}
      <Animated.View entering={FadeInDown.delay(480).springify().damping(18)} className="mb-5">
        <Text className="text-[10px] tracking-[2px] uppercase mb-2.5 text-text-muted">外观</Text>

        {/* Theme palette */}
        <Text className="text-[11px] tracking-[0.5px] mb-2 text-text-light">主题色彩</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {(Object.entries(themeLabels) as [ThemeName, typeof themeLabels[ThemeName]][]).map(([id, t]) => {
            const active = themeName === id
            return (
              <Pressable
                key={id}
                onPress={() => setTheme(id)}
                className={cn('rounded-xl border p-3 gap-1 active:opacity-80', active ? 'border-accent bg-bg-subtle' : 'border-border bg-bg-card')}
                style={{ width: '31%' }}
              >
                <View style={{ backgroundColor: t.dot }} className="w-2.5 h-2.5 rounded-full mb-0.5" />
                <Text className="text-sm font-semibold text-text-primary">{t.label}</Text>
                <Text className="text-[10px] tracking-[0.2px] text-text-muted" numberOfLines={1}>{t.desc}</Text>
              </Pressable>
            )
          })}
        </View>

        {/* Display mode */}
        <Text className="text-[11px] tracking-[0.5px] mb-2 text-text-light">显示模式</Text>
        <View className="flex-row rounded-xl border border-border bg-bg-subtle p-1 gap-1">
          {modeOptions.map((m) => {
            const active = mode === m.id
            return (
              <Pressable
                key={m.id}
                onPress={() => setMode(m.id)}
                className={cn('flex-1 flex-row items-center justify-center gap-1.5 py-2.5 rounded-[9px] border', active ? 'bg-bg-card border-accent' : 'border-transparent')}
              >
                <Text className={cn('text-[13px] leading-4', active ? 'text-accent' : 'text-text-light')}>
                  {m.icon}
                </Text>
                <Text className={cn('text-[13px] font-medium', active ? 'text-text-primary' : 'text-text-muted')}>
                  {m.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </Animated.View>

      {/* Footer note */}
      <Animated.View entering={FadeInDown.delay(520).springify().damping(18)} className="items-center py-4 gap-2">
        <Text className="text-base tracking-[8px] text-accent-mid">· · ·</Text>
        <Text className="text-xs tracking-[0.5px] text-text-light">用代码描绘世界，用文字记录时光</Text>
      </Animated.View>

      <View className="h-10" />
    </ScrollView>
  )
}
