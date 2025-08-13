import React from 'react'
import { View, Text } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function EditProfile() {
  const [name, setName] = React.useState('')
  const [headline, setHeadline] = React.useState('')
  const [bio, setBio] = React.useState('')
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Edit profile</Text>
      <Input placeholder="Display name" value={name} onChangeText={setName} />
      <Input placeholder="Headline" value={headline} onChangeText={setHeadline} />
      <Input placeholder="Bio" value={bio} onChangeText={setBio} multiline />
      <Button title="Save" onPress={() => {}} />
    </View>
  )
}
