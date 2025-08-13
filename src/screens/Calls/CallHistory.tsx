import React from 'react'
import { View, Text } from 'react-native'

export default function CallHistory() {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Call history</Text>
      <Text className="text-gray-600">Your past calls will be listed here.</Text>
    </View>
  )
}
