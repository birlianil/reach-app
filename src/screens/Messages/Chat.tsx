import React from 'react'
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native'

export default function Chat() {
  const [text, setText] = React.useState('')
  const messages = [{ id: '1', content: 'Hello!' }]
  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList className="flex-1 px-6 py-4" data={messages} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="mb-2"><Text>{item.content}</Text></View>
      )} />
      <View className="px-6 pb-6">
        <TextInput className="border border-gray-300 rounded-md px-3 py-2" value={text} onChangeText={setText} placeholder="Type a message" />
      </View>
    </KeyboardAvoidingView>
  )
}
