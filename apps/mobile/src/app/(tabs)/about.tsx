import { useTheme } from '@/lib/theme-context'
import { type ThemeName, themeLabels } from '@/lib/themes'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
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

export default function AboutScreen() {
  const insets = useSafeAreaInsets()
  const { colors, fonts, themeName, setTheme } = useTheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View
        entering={FadeInDown.delay(0).springify().damping(20)}
        style={styles.header}
      >
        <Text style={[styles.headerLabel, { color: colors.accent }]}>About Me</Text>
        <Text style={[styles.headerTitle, { color: colors.text, fontFamily: fonts.serif }]}>关于我</Text>
      </Animated.View>

      {/* Profile card */}
      <Animated.View
        entering={FadeInDown.delay(80).springify().damping(18)}
        style={[styles.profileCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
      >
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: colors.accentPale, borderColor: colors.accentMid }]}>
          <Text style={styles.avatarEmoji}>🌿</Text>
        </View>

        <Text style={[styles.profileName, { color: colors.text, fontFamily: fonts.serif }]}>晓千烁</Text>
        <Text style={[styles.profileRole, { color: colors.accent }]}>Developer & Writer</Text>

        {/* Bio */}
        <Text style={[styles.bio, { color: colors.textMuted, fontFamily: fonts.serif }]}>
          你好，我是晓千烁，一名前端开发者，同时也是个业余写作者。{'\n\n'}
          我相信好的代码和好的文章在本质上是相通的：都需要清晰的思维、精准的表达，以及对细节的持续打磨。{'\n\n'}
          平时喜欢骑行、摄影和读书。骑行让我在运动中清空大脑，摄影训练我的观察力，读书则是我和不同时代的人对话的方式。
        </Text>
      </Animated.View>

      {/* Quote */}
      <Animated.View
        entering={FadeInDown.delay(160).springify().damping(18)}
        style={[styles.quoteCard, { backgroundColor: colors.bgSubtle }]}
      >
        <View style={[styles.quoteBar, { backgroundColor: colors.accentPale }]} />
        <Text style={[styles.quoteText, { color: colors.textMuted, fontFamily: fonts.serif }]}>
          「时间是最好的编辑，{'\n'}　而写作是最诚实的自我审视。」
        </Text>
      </Animated.View>

      {/* Skills */}
      {skills.map((group, gi) => (
        <Animated.View
          key={group.label}
          entering={FadeInDown.delay(gi * 60 + 220).springify().damping(18)}
          style={styles.skillGroup}
        >
          <Text style={[styles.skillGroupLabel, { color: colors.textMuted }]}>{group.label}</Text>
          <View style={styles.skillChips}>
            {group.items.map((item) => (
              <View key={item} style={[styles.skillChip, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
                <Text style={[styles.skillChipText, { color: colors.text }]}>{item}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      ))}

      {/* Links */}
      <Animated.View
        entering={FadeInDown.delay(420).springify().damping(18)}
        style={styles.linksSection}
      >
        <Text style={[styles.skillGroupLabel, { color: colors.textMuted }]}>Links</Text>
        <View style={[styles.linksList, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
          {links.map((link, i) => (
            <Pressable
              key={link.label}
              onPress={() => Linking.openURL(link.url)}
              style={({ pressed }) => [
                styles.linkItem,
                i < links.length - 1 && [styles.linkItemBorder, { borderBottomColor: colors.borderLight }],
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={[styles.linkIcon, { color: colors.accent }]}>{link.icon}</Text>
              <Text style={[styles.linkLabel, { color: colors.text }]}>{link.label}</Text>
              <Text style={[styles.linkArrow, { color: colors.textLight }]}>›</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* Theme switcher */}
      <Animated.View
        entering={FadeInDown.delay(480).springify().damping(18)}
        style={styles.skillGroup}
      >
        <Text style={[styles.skillGroupLabel, { color: colors.textMuted }]}>外观</Text>
        <View style={styles.themeRow}>
          {(Object.entries(themeLabels) as [ThemeName, typeof themeLabels[ThemeName]][]).map(([id, t]) => {
            const active = themeName === id
            return (
              <Pressable
                key={id}
                onPress={() => setTheme(id)}
                style={[
                  styles.themeCard,
                  {
                    borderColor: active ? colors.accent : colors.border,
                    backgroundColor: active ? colors.bgSubtle : colors.bgCard,
                  },
                ]}
              >
                <View style={[styles.themeDot, { backgroundColor: t.dot }]} />
                <Text style={[styles.themeLabel, { color: colors.text }]}>{t.label}</Text>
                <Text style={[styles.themeDesc, { color: colors.textMuted }]}>{t.desc}</Text>
              </Pressable>
            )
          })}
        </View>
      </Animated.View>

      {/* Footer note */}
      <Animated.View
        entering={FadeInDown.delay(500).springify().damping(18)}
        style={styles.footerNote}
      >
        <Text style={[styles.footerDots, { color: colors.accentMid }]}>· · ·</Text>
        <Text style={[styles.footerText, { color: colors.textLight }]}>用代码描绘世界，用文字记录时光</Text>
      </Animated.View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  headerLabel: {
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  profileCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  quoteCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  quoteBar: {
    width: 3,
    borderRadius: 2,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  skillGroup: {
    marginBottom: 20,
  },
  skillGroupLabel: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  skillChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillChipText: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  linksSection: {
    marginBottom: 24,
  },
  linksList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  linkItemBorder: {
    borderBottomWidth: 1,
  },
  linkIcon: {
    fontSize: 14,
    width: 20,
    textAlign: 'center',
  },
  linkLabel: {
    flex: 1,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  linkArrow: {
    fontSize: 18,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  themeCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  themeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeDesc: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerDots: {
    fontSize: 16,
    letterSpacing: 8,
  },
  footerText: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
})
