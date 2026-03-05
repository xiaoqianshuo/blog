import PostCard from '@/components/PostCard'
import SectionHeader from '@/components/SectionHeader'
import { formatDateShort, getFeaturedPosts, getRecentPosts } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { categoryColor } from '@/lib/themes'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { colors, fonts } = useTheme()
  const featured = getFeaturedPosts()
  const recent = getRecentPosts(5)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero ──────────────────────────────── */}
      <Animated.View
        entering={FadeInDown.delay(0).springify().damping(20)}
        style={styles.hero}
      >
        {/* Small dot + label */}
        <View style={styles.heroLabel}>
          <View style={[styles.heroDot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.heroLabelText, { color: colors.accent }]}>Personal Blog</Text>
        </View>

        <Text style={[styles.heroName, { color: colors.text, fontFamily: fonts.serif }]}>晓千烁</Text>

        <Text style={[styles.heroRole, { color: colors.accent }]}>Developer · Writer · Explorer</Text>

        <Text style={[styles.heroTagline, { color: colors.textMuted, fontFamily: fonts.serif }]}>
          用代码描绘世界，{'\n'}用文字记录时光。
        </Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: '篇文章', value: '6' },
            { label: '个分类', value: '3' },
            { label: '分钟平均', value: '7' },
          ].map((s) => (
            <View key={s.label} style={[styles.stat, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.accent, fontFamily: fonts.serif }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* ── Divider ───────────────────────────── */}
      <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

      {/* ── Featured ──────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader
          title="精选文章"
          onMore={() => router.push('/blog' as any)}
        />
        {featured.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i + 1} />
        ))}
      </View>

      {/* ── Recent ────────────────────────────── */}
      <View style={[styles.section, { marginTop: 8 }]}>
        <SectionHeader
          title="最近更新"
          onMore={() => router.push('/blog' as any)}
        />
        <View style={[styles.recentList, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
          {recent.map((post, i) => (
            <Animated.View
              key={post.slug}
              entering={FadeInDown.delay(i * 60 + 200).springify().damping(18)}
            >
              <Pressable
                onPress={() => router.push(`/blog/${post.slug}` as any)}
                style={({ pressed }) => [
                  styles.recentItem,
                  i < recent.length - 1 && [styles.recentItemBorder, { borderBottomColor: colors.borderLight }],
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View style={styles.recentLeft}>
                  <View
                    style={[
                      styles.recentDot,
                      { borderColor: categoryColor(colors)[post.category] ?? colors.accent },
                    ]}
                  />
                  <Text style={[styles.recentTitle, { color: colors.text, fontFamily: fonts.serif }]} numberOfLines={1}>
                    {post.title}
                  </Text>
                </View>
                <Text style={[styles.recentDate, { color: colors.textLight }]}>{formatDateShort(post.date)}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </View>

      <View style={{ height: 32 }} />
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
  hero: {
    paddingVertical: 28,
    paddingHorizontal: 4,
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  heroLabelText: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroName: {
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 6,
  },
  heroRole: {
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroTagline: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 0,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 10,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  section: {
    marginBottom: 8,
  },
  recentList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  recentItemBorder: {
    borderBottomWidth: 1,
  },
  recentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recentDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    flexShrink: 0,
  },
  recentTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  recentDate: {
    fontSize: 11,
    letterSpacing: 0.2,
    flexShrink: 0,
  },
})
