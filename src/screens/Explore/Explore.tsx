import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

const CATEGORIES = ['Health', 'Sports', 'Software', 'Veterinary', 'Education']

export default function Explore({ navigation }: any) {
  const demoExpert = { display_name: 'Demo Expert', headline: 'Coach', bio: 'Sample expert for demo', hourly_rate_cents: 15000 }
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Explore</Text>

      <TouchableOpacity className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4" onPress={() => navigation.navigate('ExpertProfile', { expert: demoExpert })}>
        <Text className="font-semibold text-blue-700">Try the demo booking flow →</Text>
        <Text className="text-blue-700">Opens Demo Expert profile (fake mode supported)</Text>
      </TouchableOpacity>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded-md p-4"
            onPress={() => navigation.navigate('Search', { category: item })}
          >
            <Text className="font-medium">{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
