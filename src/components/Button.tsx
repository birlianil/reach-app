import React from 'react'
import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native'

interface ButtonProps {
  title: string
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'destructive'
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
}

export default function Button({ title, onPress, variant = 'primary', loading, disabled, style }: ButtonProps) {
  const base = 'px-4 py-3 rounded-md items-center'
  const variants: Record<typeof variant, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-200',
    destructive: 'bg-red-600'
  }
  const textVariants: Record<typeof variant, string> = {
    primary: 'text-white',
    secondary: 'text-gray-900',
    destructive: 'text-white'
  }

  return (
    <Pressable
      accessibilityRole="button"
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-60' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text className={`font-medium ${textVariants[variant]}`}>{title}</Text>}
    </Pressable>
  )
}
