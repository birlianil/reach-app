import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'

export default function Welcome({ navigation }: any) {
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-2">Welcome to ReachApp</Text>
      <Text className="text-gray-600 mb-8">Book 1:1 video calls with experts and creators.</Text>
      <Button title="Continue" onPress={() => navigation.navigate('Login')} />
    </View>
  )
}
