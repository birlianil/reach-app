import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'

export default function BookingSuccess({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-2xl font-bold mb-3">Booking confirmed</Text>
      <Text className="text-gray-600 mb-6">We sent a confirmation to your email.</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('MainTabs')} />
    </View>
  )
}
