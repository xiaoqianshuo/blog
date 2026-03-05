import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '@/lib/theme-context'

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
  const { colors, fonts } = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.serif }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
      </View>
      {onMore && (
        <Pressable onPress={onMore}>
          <Text style={[styles.more, { color: colors.accent }]}>{moreLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  left: {
    gap: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  more: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
})
