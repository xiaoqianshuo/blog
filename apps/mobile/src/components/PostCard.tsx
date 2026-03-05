import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated'
import type { Post } from '@/lib/blog-data'
import { formatDateShort } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { categoryColor, categoryBg } from '@/lib/themes'

interface PostCardProps {
  post: Post
  index?: number
  compact?: boolean
}

export default function PostCard({ post, index = 0, compact = false }: PostCardProps) {
  const router = useRouter()
  const { colors, fonts } = useTheme()

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify().damping(18)}>
      <Pressable
        onPress={() => router.push(`/blog/${post.slug}` as any)}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors.bgCard, borderColor: colors.border },
          compact && styles.cardCompact,
          pressed && styles.pressed,
        ]}
      >
        {/* Left category bar */}
        <View
          style={[
            styles.categoryBar,
            { backgroundColor: categoryColor(colors)[post.category] ?? colors.accent },
          ]}
        />

        <View style={styles.content}>
          {/* Category + Date row */}
          <View style={styles.meta}>
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
            <Text style={[styles.date, { color: colors.textLight, fontFamily: fonts.serif }]}>
              {formatDateShort(post.date)}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={[styles.title, { color: colors.text, fontFamily: fonts.serif }, compact && styles.titleCompact]}
            numberOfLines={2}
          >
            {post.title}
          </Text>

          {/* Excerpt */}
          {!compact && (
            <Text style={[styles.excerpt, { color: colors.textMuted }]} numberOfLines={2}>
              {post.excerpt}
            </Text>
          )}

          {/* Tags + Reading time */}
          <View style={styles.footer}>
            <View style={styles.tags}>
              {post.tags.slice(0, 2).map((tag) => (
                <View key={tag} style={[styles.tag, { backgroundColor: colors.bgSubtle, borderColor: colors.borderLight }]}>
                  <Text style={[styles.tagText, { color: colors.textMuted }]}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.readingTime, { color: colors.textLight }]}>{post.readingTime} 分钟</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardCompact: {
    marginBottom: 0,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  categoryBar: {
    width: 3,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  date: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  titleCompact: {
    fontSize: 14,
    lineHeight: 20,
  },
  excerpt: {
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  tagText: {
    fontSize: 10,
  },
  readingTime: {
    fontSize: 11,
  },
})
