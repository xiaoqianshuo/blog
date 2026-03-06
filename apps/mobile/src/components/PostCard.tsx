import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated'
import type { Post } from '@/lib/blog-data'
import { formatDateShort } from '@/lib/blog-data'
import { useTheme } from '@/lib/theme-context'
import { categoryColor, categoryBg } from '@/lib/themes'
import { cn } from '@/lib/utils'

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
        className={cn('rounded-xl border border-border flex-row overflow-hidden bg-bg-card active:opacity-[0.92] active:scale-[0.99]', compact ? 'mb-0' : 'mb-3')}
      >
        {/* Left category bar */}
        <View
          style={{ backgroundColor: categoryColor(colors)[post.category] ?? colors.accent }}
          className="w-[3px] rounded-xl"
        />

        <View className="flex-1 p-4 gap-2">
          {/* Category + Date row */}
          <View className="flex-row items-center justify-between">
            <View
              style={{ backgroundColor: categoryBg(colors)[post.category] ?? colors.tagTech }}
              className="px-2 py-0.5 rounded-full"
            >
              <Text
                style={{ color: categoryColor(colors)[post.category] ?? colors.accent }}
                className="text-[10px] font-semibold tracking-[1px]"
              >
                {post.category}
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.serif }} className="text-[11px] tracking-[0.3px] text-text-light">
              {formatDateShort(post.date)}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{ fontFamily: fonts.serif }}
            className={cn('font-semibold text-text-primary', compact ? 'text-sm leading-5' : 'text-base leading-[22px]')}
            numberOfLines={2}
          >
            {post.title}
          </Text>

          {/* Excerpt */}
          {!compact && (
            <Text className="text-[13px] leading-5 text-text-muted" numberOfLines={2}>
              {post.excerpt}
            </Text>
          )}

          {/* Tags + Reading time */}
          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <View key={tag} className="border border-border-light rounded bg-bg-subtle px-1.5 py-0.5">
                  <Text className="text-[10px] text-text-muted">{tag}</Text>
                </View>
              ))}
            </View>
            <Text className="text-[11px] text-text-light">{post.readingTime} 分钟</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}
