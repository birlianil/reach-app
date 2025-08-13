import React from 'react'
import { View, Text } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function RequestForm({ navigation }: any) {
  const [message, setMessage] = React.useState('')
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-xl font-bold mb-4">Send a request</Text>
      <Input placeholder="Message for the expert" multiline onChangeText={setMessage} />
      <Button title="Submit" onPress={() => navigation.navigate('BookingSuccess')} />
    </View>
  )
}
