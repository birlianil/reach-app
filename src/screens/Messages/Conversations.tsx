import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

const DATA = [
  { id: '1', name: 'Demo Expert', last: 'See you then!' }
]

export default function Conversations({ navigation }: any) {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Messages</Text>
      <FlatList
        data={DATA}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="border border-gray-200 rounded-md p-4 mb-3" onPress={() => navigation.navigate('Chat', { id: item.id })}>
            <Text className="font-semibold">{item.name}</Text>
            <Text className="text-gray-600">{item.last}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
