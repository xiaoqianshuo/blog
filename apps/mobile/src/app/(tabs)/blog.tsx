import { useState, useMemo } from 'react'
import { FlatList, View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { FadeInDown } from 'react-native-reanimated'
import PostCard from '@/components/PostCard'
import { posts } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'

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
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16 },
      ]}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.slug}
      data={filteredPosts}
      ListHeaderComponent={
        <View>
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(0).springify().damping(20)}
            style={styles.header}
          >
            <Text style={[styles.headerLabel, { color: colors.accent }]}>All Articles</Text>
            <Text style={[styles.headerTitle, { color: colors.text, fontFamily: fonts.serif }]}>文章</Text>
            <Text style={[styles.headerCount, { color: colors.textMuted }]}>共 {posts.length} 篇</Text>
          </Animated.View>

          {/* Search */}
          <Animated.View
            entering={FadeInDown.delay(80).springify().damping(20)}
            style={[styles.searchWrapper, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
          >
            <Text style={[styles.searchIcon, { color: colors.textMuted }]}>⌕</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="搜索文章…"
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Text style={[styles.searchClear, { color: colors.textLight }]}>✕</Text>
              </Pressable>
            )}
          </Animated.View>

          {/* Category filter */}
          <Animated.View
            entering={FadeInDown.delay(120).springify().damping(20)}
            style={styles.filterRow}
          >
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory
              return (
                <Pressable
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={[
                    styles.filterChip,
                    { borderColor: colors.border, backgroundColor: colors.bgSubtle },
                    active && { backgroundColor: colors.accent, borderColor: colors.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      { color: colors.textMuted },
                      active && { color: colors.bgCard, fontWeight: '500' as const },
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              )
            })}
          </Animated.View>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        </View>
      }
      renderItem={({ item, index }) => (
        <PostCard post={item} index={index} />
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>没有找到相关文章</Text>
        </View>
      }
      ListFooterComponent={<View style={{ height: 32 }} />}
    />
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
  headerCount: {
    fontSize: 13,
    marginTop: 4,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  searchClear: {
    fontSize: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 13,
    letterSpacing: 0.3,
    fontWeight: '400',
  },
  filterChipTextActive: {
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  empty: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
})
