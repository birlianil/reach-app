import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'

export default function OnboardingLinkedIn({ navigation }: any) {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-2">Import from LinkedIn</Text>
      <Text className="text-gray-600 mb-6">We prefilled your profile based on LinkedIn. Review and continue.</Text>
      <Button title="Continue" onPress={() => navigation.replace('Register')} />
    </View>
  )
}
