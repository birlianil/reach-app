import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Button from '../../components/Button'
import { useAuthStore } from '../../store/auth.store'

export default function HomeAuthed({ navigation }: any) {
  const { signOut } = useAuthStore()
  return (
    <ScrollView className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Welcome back</Text>
      <Text className="text-gray-600 mb-6">Your personalized feed will appear here.</Text>
      <View className="h-2" />
      <Button title="Search experts" onPress={() => navigation.navigate('Search')} />
      <View className="h-2" />
      <Button title="My bookings" variant="secondary" onPress={() => navigation.navigate('MyBookings')} />
      <View className="h-6" />
      <Button title="Sign out" variant="secondary" onPress={signOut} />
    </ScrollView>
  )
}
