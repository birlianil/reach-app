import React from 'react'
import { View, Text } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Search() {
  const [q, setQ] = React.useState('')
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Search</Text>
      <Input placeholder="Search experts" onChangeText={setQ} />
      <Button title="Search" onPress={() => { /* TODO: hook to Supabase FTS */ }} />
    </View>
  )
}
