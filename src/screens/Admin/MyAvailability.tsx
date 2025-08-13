import React from 'react'
import { View, Text } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function MyAvailability() {
  const [rrule, setRrule] = React.useState('FREQ=WEEKLY;BYDAY=MO,WE')
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">My availability</Text>
      <Input label="Recurring rule (RRULE)" value={rrule} onChangeText={setRrule} />
      <Button title="Save" onPress={() => {}} />
    </View>
  )
}
