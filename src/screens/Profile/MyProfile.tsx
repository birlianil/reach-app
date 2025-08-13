import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'

export default function MyProfile({ navigation }: any) {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">My profile</Text>
      <Button title="Edit profile" onPress={() => navigation.navigate('EditProfile')} />
      <View className="h-2" />
      <Button title="Stripe onboarding" variant="secondary" onPress={() => navigation.navigate('StripeOnboarding')} />
      <View className="h-2" />
      <Button title="My availability" variant="secondary" onPress={() => navigation.navigate('MyAvailability')} />
      <View className="h-2" />
      <Button title="Requests queue" variant="secondary" onPress={() => navigation.navigate('RequestsQueue')} />
    </View>
  )
}
