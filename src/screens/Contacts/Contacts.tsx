import React from 'react'
import { View, Text } from 'react-native'

export default function Contacts() {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Contacts</Text>
      <Text className="text-gray-600">Followed experts and favorites appear here.</Text>
    </View>
  )
}
