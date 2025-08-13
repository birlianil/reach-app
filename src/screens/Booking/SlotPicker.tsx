import React from 'react'
import { View, Text } from 'react-native'
import CalendarPicker from '../../components/CalendarPicker'
import Button from '../../components/Button'

export default function SlotPicker({ navigation }: any) {
  const [date, setDate] = React.useState<string | null>(null)
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-xl font-bold mb-4">Pick a date</Text>
      <CalendarPicker onSelectDate={setDate} />
      <View className="h-4" />
      <Button title="Continue" onPress={() => navigation.navigate('Checkout', { date })} disabled={!date} />
    </View>
  )
}
