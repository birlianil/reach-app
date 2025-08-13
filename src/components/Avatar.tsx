import React from 'react'
import { Image, View, Text } from 'react-native'

interface Props {
  uri?: string
  size?: number
  name?: string
}

export default function Avatar({ uri, size = 48, name }: Props) {
  const initials = name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  return uri ? (
    <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
  ) : (
    <View style={{ width: size, height: size, borderRadius: size / 2 }} className="bg-gray-200 items-center justify-center">
      <Text className="text-gray-700 font-semibold">{initials || '?'}</Text>
    </View>
  )
}
