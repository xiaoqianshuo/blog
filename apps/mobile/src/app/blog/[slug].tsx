import { ScrollView, View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import { getPostBySlug, formatDate, type ContentBlock } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { categoryColor, categoryBg } from '@/lib/themes'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  const { colors, fonts } = useTheme()
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <View key={i} style={[prose.h2Wrapper, { borderBottomColor: colors.borderLight }]}>
                <Text style={[prose.h2, { color: colors.text, fontFamily: fonts.serif }]}>{block.text}</Text>
              </View>
            )
          case 'p':
            return (
              <Text key={i} style={[prose.p, { fontFamily: fonts.serif, color: colors.textMuted }]}>
                {block.text}
              </Text>
            )
          case 'code':
            return (
              <View key={i} style={[prose.codeBlock, { backgroundColor: colors.bgSubtle, borderColor: colors.border }]}>
                <Text style={[prose.codeText, { fontFamily: fonts.mono, color: colors.textMuted }]}>{block.text}</Text>
              </View>
            )
          case 'ul':
            return (
              <View key={i} style={prose.ul}>
                {block.items.map((item, j) => (
                  <View key={j} style={prose.liRow}>
                    <View style={[prose.liBullet, { backgroundColor: colors.accentPale, borderColor: colors.accentMid }]} />
                    <Text style={[prose.liText, { fontFamily: fonts.serif, color: colors.textMuted }]}>{item}</Text>
                  </View>
                ))}
              </View>
            )
          default:
            return null
        }
      })}
    </>
  )
}

export default function BlogDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const { colors, fonts } = useTheme()

  const post = getPostBySlug(slug)
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y
  })

  // Header fades in as user scrolls
  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [60, 120], [0, 1], Extrapolation.CLAMP),
  }))

  // Progress bar
  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(scrollY.value, [0, 3000], [0, width], Extrapolation.CLAMP),
  }))

  if (!post) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
        <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 60 }}>
          文章不存在
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Reading progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.borderLight }]}>
        <Animated.View style={[styles.progressBar, { backgroundColor: colors.accent }, progressStyle]} />
      </View>

      {/* Floating sticky header */}
      <View style={[styles.stickyHeader, { paddingTop: insets.top, borderBottomColor: colors.borderLight, backgroundColor: colors.bgCard + 'EB' }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text
            style={[styles.backText, { color: colors.accent }]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            ‹ 返回
          </Text>
        </Pressable>
        <Animated.Text style={[styles.stickyTitle, { color: colors.text, fontFamily: fonts.serif }, headerStyle]} numberOfLines={1}>
          {post.title}
        </Animated.Text>
        <View style={{ minWidth: 56, flexShrink: 0 }} />
      </View>

      {/* Content */}
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 56 },
        ]}
      >
        {/* Article header */}
        <Animated.View
          entering={FadeInDown.delay(50).springify().damping(20)}
          style={styles.articleHeader}
        >
          {/* Category badge */}
          <View
            style={[
              styles.categoryPill,
              { backgroundColor: categoryBg(colors)[post.category] ?? colors.tagTech },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color: categoryColor(colors)[post.category] ?? colors.accent },
              ]}
            >
              {post.category}
            </Text>
          </View>

          {/* Title */}
          <Text style={[styles.articleTitle, { color: colors.text, fontFamily: fonts.serif }]}>{post.title}</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{formatDate(post.date)}</Text>
            <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{post.readingTime} 分钟阅读</Text>
          </View>

          {/* Tags */}
          <View style={styles.tags}>
            {post.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.bgSubtle, borderColor: colors.borderLight }]}>
                <Text style={[styles.tagText, { color: colors.textMuted }]}># {tag}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

        {/* Body */}
        <Animated.View
          entering={FadeInDown.delay(150).springify().damping(20)}
          style={styles.body}
        >
          <ContentRenderer blocks={post.content} />
        </Animated.View>

        {/* Footer */}
        <View style={[styles.articleFooter, { borderTopColor: colors.borderLight }]}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.footerBackBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={[styles.footerBackText, { color: colors.textMuted }]}>← 返回文章列表</Text>
          </Pressable>
          <Text style={[styles.footerSign, { color: colors.textLight }]}>— xiaoqianshuo</Text>
        </View>

        <View style={{ height: insets.bottom + 32 }} />
      </AnimatedScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 100,
  },
  progressBar: {
    height: 2,
    borderRadius: 1,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 6,
    paddingRight: 12,
    flexShrink: 0,
    minWidth: 56,
  },
  backText: {
    fontSize: 15,
    fontWeight: '500',
  },
  stickyTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  articleHeader: {
    paddingTop: 20,
    paddingBottom: 4,
    gap: 12,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  articleTitle: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 11,
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  body: {
    gap: 0,
  },
  articleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  footerBackBtn: {
    paddingVertical: 4,
  },
  footerBackText: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  footerSign: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
})

const prose = StyleSheet.create({
  h2Wrapper: {
    marginTop: 28,
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  p: {
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 16,
  },
  codeBlock: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
    overflow: 'hidden',
  },
  codeText: {
    fontSize: 12,
    lineHeight: 20,
  },
  ul: {
    marginBottom: 16,
    gap: 8,
  },
  liRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  liBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    marginTop: 9,
    flexShrink: 0,
  },
  liText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
  },
})
