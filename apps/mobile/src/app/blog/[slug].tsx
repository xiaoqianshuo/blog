import { formatDate, getPostBySlug, type ContentBlock } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { categoryBg, categoryColor } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  const { fonts } = useTheme()
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <View key={i} className="mt-7 mb-3 border-b border-border-light pb-2">
                <Text
                  style={{ fontFamily: fonts.serif }}
                  className="text-lg font-bold leading-[26px] tracking-[-0.3px] text-text-primary"
                >
                  {block.text}
                </Text>
              </View>
            )
          case 'p':
            return (
              <Text
                key={i}
                style={{ fontFamily: fonts.serif }}
                className="text-[15px] leading-[26px] mb-4 text-text-muted"
              >
                {block.text}
              </Text>
            )
          case 'code':
            return (
              <View key={i} className="border border-border rounded-[10px] p-4 my-4 overflow-hidden bg-bg-subtle">
                <Text style={{ fontFamily: fonts.mono }} className="text-xs leading-5 text-text-muted">
                  {block.text}
                </Text>
              </View>
            )
          case 'ul':
            return (
              <View key={i} className="mb-4 gap-2">
                {block.items.map((item, j) => (
                  <View key={j} className="flex-row items-start gap-2.5">
                    <View className="w-1.5 h-1.5 rounded-full border border-accent-mid bg-accent-pale mt-[9px] shrink-0" />
                    <Text
                      style={{ fontFamily: fonts.serif }}
                      className="flex-1 text-[15px] leading-6 text-text-muted"
                    >
                      {item}
                    </Text>
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

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [60, 120], [0, 1], Extrapolation.CLAMP),
  }))

  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(scrollY.value, [0, 3000], [0, width], Extrapolation.CLAMP),
  }))

  if (!post) {
    return (
      <View style={{ paddingTop: insets.top }} className="flex-1 bg-bg">
        <Text className="text-center mt-[60px] text-text-muted">文章不存在</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-bg">
      {/* Reading progress bar */}
      <View className="absolute top-0 left-0 right-0 h-0.5 z-[100] bg-border-light">
        <Animated.View
        className={cn('h-0.5 rounded-[1px] bg-accent')}
          style={progressStyle}
        />
      </View>

      {/* Floating sticky header */}
      <View
        style={{ paddingTop: insets.top, backgroundColor: colors.bgCard + 'EB' }}
        className={cn('absolute top-0 left-0 right-0 z-50 flex-row items-center px-4 pb-3 border-b border-border-light')}
      >
        <Pressable onPress={() => router.back()} className="py-1.5 pr-3 shrink-0 min-w-[56px]">
          <Text className="text-[15px] font-medium text-accent" numberOfLines={1} allowFontScaling={false}>
            ‹ 返回
          </Text>
        </Pressable>
        <Animated.Text
          style={[{ fontFamily: fonts.serif }, headerStyle]}
          className="flex-1 text-sm font-semibold text-center text-text-primary"
          numberOfLines={1}
        >
          {post.title}
        </Animated.Text>
        <View className="min-w-[56px] shrink-0" />
      </View>

      {/* Content */}
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: insets.top + 56 }}
      >
        {/* Article header */}
        <Animated.View entering={FadeInDown.delay(50).springify().damping(20)} className="pt-5 pb-1 gap-3">
          {/* Category badge */}
          <View
            style={{ backgroundColor: categoryBg(colors)[post.category] ?? colors.tagTech }}
            className="self-start px-2.5 py-[3px] rounded-[20px]"
          >
            <Text
              style={{ color: categoryColor(colors)[post.category] ?? colors.accent }}
              className="text-[10px] font-semibold tracking-[1px]"
            >
              {post.category}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{ fontFamily: fonts.serif }}
            className="text-[26px] font-bold leading-9 tracking-[-0.5px] text-text-primary"
          >
            {post.title}
          </Text>

          {/* Meta */}
          <View className="flex-row items-center gap-2">
            <Text className="text-xs tracking-[0.2px] text-text-muted">{formatDate(post.date)}</Text>
            <View className="w-[3px] h-[3px] rounded-full bg-border" />
            <Text className="text-xs tracking-[0.2px] text-text-muted">{post.readingTime} 分钟阅读</Text>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <View key={tag} className="border border-border-light rounded bg-bg-subtle px-2 py-0.5">
                <Text className="text-[11px] text-text-muted"># {tag}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Divider */}
        <View className="h-px my-6 bg-border-light" />

        {/* Body */}
        <Animated.View entering={FadeInDown.delay(150).springify().damping(20)}>
          <ContentRenderer blocks={post.content} />
        </Animated.View>

        {/* Footer */}
        <View className="flex-row items-center justify-between mt-10 pt-5 border-t border-border-light">
          <Pressable
            onPress={() => router.back()}
            className="py-1 active:opacity-60"
          >
            <Text className="text-[13px] tracking-[0.3px] text-text-muted">← 返回文章列表</Text>
          </Pressable>
          <Text className="text-xs tracking-[0.5px] text-text-light">— xiaoqianshuo</Text>
        </View>

        <View style={{ height: insets.bottom + 32 }} />
      </AnimatedScrollView>
    </View>
  )
}
