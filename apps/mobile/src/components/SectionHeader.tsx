import { useTheme } from '@/lib/theme-context'
import { Pressable, Text, View } from 'react-native'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  onMore?: () => void
  moreLabel?: string
}

export default function SectionHeader({
  title,
  subtitle,
  onMore,
  moreLabel = '全部 →',
}: SectionHeaderProps) {
  const { fonts } = useTheme()

  return (
    <View className="flex-row items-baseline justify-between mb-3.5">
      <View className="gap-0.5">
        <Text
          style={{ fontFamily: fonts.serif }}
          className="text-text-primary text-[17px] font-bold tracking-[-0.3px]"
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-xs mt-0.5 text-text-muted">{subtitle}</Text>
        )}
      </View>
      {onMore && (
        <Pressable onPress={onMore}>
          <Text className="text-[13px] tracking-[0.3px] text-accent">{moreLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}
