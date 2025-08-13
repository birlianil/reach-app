import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'

export default function BookingMode({ navigation, route }: any) {
  const { expert } = route.params
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-xl font-bold mb-4">Choose booking mode</Text>
      <Button title="Time slots" onPress={() => navigation.navigate('SlotPicker', { expert })} />
      <View className="h-3" />
      <Button title="Request queue" variant="secondary" onPress={() => navigation.navigate('RequestForm', { expert })} />
    </View>
  )
}
