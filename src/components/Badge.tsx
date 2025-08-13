import React from 'react'
import { Text, View, ViewStyle } from 'react-native'

interface Props {
  text: string
  color?: 'gray' | 'green' | 'red' | 'blue'
  style?: ViewStyle
}

export default function Badge({ text, color = 'gray', style }: Props) {
  const map: Record<string, string> = {
    gray: 'bg-gray-200 text-gray-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800'
  }
  return (
    <View className={`px-2 py-1 rounded-md ${map[color]}`} style={style}>
      <Text className="text-xs font-medium">{text}</Text>
    </View>
  )
}
