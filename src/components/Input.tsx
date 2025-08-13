import React from 'react'
import { TextInput, View, Text, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  label?: string
  errorText?: string
}

export default function Input({ label, errorText, ...rest }: Props) {
  return (
    <View className="mb-3">
      {label ? <Text className="mb-1 text-gray-700">{label}</Text> : null}
      <TextInput
        className="border border-gray-300 rounded-md px-3 py-2 text-base"
        placeholderTextColor="#9ca3af"
        {...rest}
      />
      {errorText ? <Text className="text-red-600 text-sm mt-1">{errorText}</Text> : null}
    </View>
  )
}
