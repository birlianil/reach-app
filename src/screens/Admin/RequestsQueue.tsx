import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Button from '../../components/Button'

const DATA = [
  { id: '1', requester: 'Alice', message: 'Can we talk about my project?' }
]

export default function RequestsQueue() {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Requests queue</Text>
      <FlatList
        data={DATA}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View className="border border-gray-200 rounded-md p-4 mb-3">
            <Text className="font-semibold">{item.requester}</Text>
            <Text className="text-gray-600 mb-3">{item.message}</Text>
            <View className="flex-row gap-3">
              <Button title="Approve" onPress={() => {}} />
              <Button title="Decline" variant="secondary" onPress={() => {}} />
            </View>
          </View>
        )}
      />
    </View>
  )
}
