import PostCard from '@/components/PostCard'
import { posts } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CATEGORIES = ['全部', '技术', '生活', '随笔'] as const
type Category = (typeof CATEGORIES)[number]

export default function BlogScreen() {
  const insets = useSafeAreaInsets()
  const { colors, fonts } = useTheme()
  const [activeCategory, setActiveCategory] = useState<Category>('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return posts
      .filter((p) => activeCategory === '全部' || p.category === activeCategory)
      .filter(
        (p) =>
          !searchQuery ||
          p.title.includes(searchQuery) ||
          p.excerpt.includes(searchQuery) ||
          p.tags.some((t) => t.includes(searchQuery)),
      )
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  }, [activeCategory, searchQuery])

  return (
    <FlatList
      className="flex-1 bg-bg"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16 }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.slug}
      data={filteredPosts}
      ListHeaderComponent={
        <View>
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(0).springify().damping(20)} className="py-5 px-1">
            <Text className="text-[10px] tracking-[2.5px] uppercase mb-1.5 text-accent">All Articles</Text>
            <Text
              style={{ fontFamily: fonts.serif }}
              className="text-[34px] font-bold tracking-[-0.8px] text-text-primary"
            >
              文章
            </Text>
            <Text className="text-[13px] mt-1 text-text-muted">共 {posts.length} 篇</Text>
          </Animated.View>

          {/* Search */}
          <Animated.View
            entering={FadeInDown.delay(80).springify().damping(20)}
            className="flex-row items-center border border-border rounded-[10px] px-3 py-2.5 mb-3.5 gap-2 bg-bg-card"
          >
            <Text className="text-base text-text-muted">⌕</Text>
            <TextInput
              className="flex-1 text-sm text-text-primary p-0"
              placeholder="搜索文章…"
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Text className="text-xs text-text-light">✕</Text>
              </Pressable>
            )}
          </Animated.View>

          {/* Category filter */}
          <Animated.View
            entering={FadeInDown.delay(120).springify().damping(20)}
            className="flex-row gap-2 mb-5 flex-wrap"
          >
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory
              return (
                <Pressable
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  className={cn('px-3.5 py-1.5 rounded-full border', active ? 'bg-accent border-accent' : 'border-border')}
                >
                  <Text
                    className={cn('text-[13px] tracking-[0.3px]', active ? 'font-medium color-bg-card' : 'text-text-muted')}
                  >
                    {cat}
                  </Text>
                </Pressable>
              )
            })}
          </Animated.View>

          <View className="h-px mb-4 bg-border-light" />
        </View>
      }
      renderItem={({ item, index }) => (
        <PostCard post={item} index={index} />
      )}
      ListEmptyComponent={
        <View className="py-[60px] items-center">
          <Text className="text-sm text-text-muted">没有找到相关文章</Text>
        </View>
      }
      ListFooterComponent={<View className="h-8" />}
    />
  )
}
