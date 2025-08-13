import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Badge from '../../components/Badge'

const DATA = [
  { id: '1', expert: 'Demo Expert', status: 'scheduled' },
  { id: '2', expert: 'Coach Jane', status: 'completed' }
]

export default function MyBookings() {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">My bookings</Text>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="border border-gray-200 rounded-md p-4 mb-3">
            <Text className="font-semibold">{item.expert}</Text>
            <View className="h-2" />
            <Badge text={item.status} color={item.status === 'scheduled' ? 'blue' : 'gray'} />
          </View>
        )}
      />
    </View>
  )
}
