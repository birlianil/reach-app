import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Button from '../../components/Button'

export default function HomeGuest({ navigation }: any) {
  return (
    <ScrollView className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Discover experts</Text>
      <Text className="text-gray-600 mb-6">Browse categories and featured experts. Sign in to book calls.</Text>
      <Button title="Explore" onPress={() => navigation.navigate('Explore')} />
    </ScrollView>
  )
}
