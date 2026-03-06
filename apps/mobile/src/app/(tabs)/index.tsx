import PostCard from '@/components/PostCard'
import SectionHeader from '@/components/SectionHeader'
import { formatDateShort, getFeaturedPosts, getRecentPosts } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { categoryColor } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
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
      className="flex-1 bg-bg"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <Animated.View entering={FadeInDown.delay(0).springify().damping(20)} className="py-7 px-1">
        <View className="flex-row items-center gap-1.5 mb-4">
          <View className="w-1.5 h-1.5 rounded-full bg-accent" />
          <Text className="text-[11px] tracking-[2px] uppercase text-accent">Personal Blog</Text>
        </View>
        <Text style={{ fontFamily: fonts.serif }} className="text-[44px] font-bold tracking-[-1px] mb-1.5 text-text-primary">
          晓千烁
        </Text>
        <Text className="text-[13px] tracking-[2px] mb-4 text-accent">Developer · Writer · Explorer</Text>
        <Text style={{ fontFamily: fonts.serif }} className="text-base leading-[26px] mb-7 text-text-muted">
         用代码描绘世界，{'\n'}用文字记录时光。
        </Text>
        <View className="flex-row">
          {[
            { label: '篇文章', value: '6' },
            { label: '个分类', value: '3' },
            { label: '分钟平均', value: '7' },
          ].map((s) => (
            <View key={s.label} className="flex-1 items-center py-3.5 border border-border bg-bg-card">
              <Text style={{ fontFamily: fonts.serif }} className="text-[22px] font-bold text-accent">{s.value}</Text>
              <Text className="text-[10px] mt-0.5 tracking-[0.5px] text-text-muted">{s.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <View className="h-px my-6 bg-border-light" />

      <View className="mb-2">
        <SectionHeader title="精选文章" onMore={() => router.push('/blog')} />
        {featured.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i + 1} />
        ))}
      </View>

      <View className="mt-2 mb-2">
        <SectionHeader title="最近更新" onMore={() => router.push('/blog')} />
        <View className="rounded-xl border border-border bg-bg-card overflow-hidden">
          {recent.map((post, i) => (
            <Animated.View key={post.slug} entering={FadeInDown.delay(i * 60 + 200).springify().damping(18)}>
              <Pressable
                onPress={() => router.push(`/blog/${post.slug}`)}
                className={cn('flex-row items-center justify-between py-3.5 px-4 gap-3 active:opacity-70', i < recent.length - 1 && 'border-b border-border-light')}
              >
                <View className="flex-1 flex-row items-center gap-2.5">
                  <View
                    style={{ borderColor: categoryColor(colors)[post.category] ?? colors.accent }}
                    className={cn('w-[7px] h-[7px] rounded-[4px] border-[1.5px] bg-transparent shrink-0')}
                  />
                  <Text style={{ fontFamily: fonts.serif }} className="flex-1 text-sm font-medium text-text-primary" numberOfLines={1}>
                    {post.title}
                  </Text>
                </View>
                <Text className="text-[11px] tracking-[0.2px] shrink-0 text-text-light">{formatDateShort(post.date)}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </View>

      <View className="h-8" />
    </ScrollView>
  )
}
