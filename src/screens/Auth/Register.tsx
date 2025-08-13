import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'
import { useProfileStore } from '../../store/profile.store'

export default function Register({ navigation }: any) {
  const { setRole } = useProfileStore()
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Choose your role</Text>
      <Text className="text-gray-600 mb-6">You can change this later in Settings.</Text>
      <Button title="Seeker" onPress={() => { setRole('seeker'); navigation.replace('MainTabs') }} />
      <View className="h-3" />
      <Button title="Expert" variant="secondary" onPress={() => { setRole('expert'); navigation.replace('MainTabs') }} />
      <View className="h-3" />
      <Button title="Both" variant="secondary" onPress={() => { setRole('both'); navigation.replace('MainTabs') }} />
    </View>
  )
}
