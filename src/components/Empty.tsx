import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  title?: string
  subtitle?: string
}

export default function Empty({ title = 'Nothing here yet', subtitle }: Props) {
  return (
    <View className="items-center justify-center py-12">
      <Text className="text-lg font-semibold text-gray-800">{title}</Text>
      {subtitle ? <Text className="text-gray-500 mt-2">{subtitle}</Text> : null}
    </View>
  )
}
