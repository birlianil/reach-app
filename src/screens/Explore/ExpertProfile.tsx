import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'
import PriceTag from '../../components/PriceTag'

export default function ExpertProfile({ navigation, route }: any) {
  const { expert } = route.params || { expert: { display_name: 'Demo Expert', headline: 'Coach', bio: 'Bio here', hourly_rate_cents: 15000 } }
  return (
    <ScrollView className="flex-1 px-6 py-8">
      <View className="flex-row items-center gap-4 mb-4">
        <Avatar name={expert.display_name} size={56} />
        <View>
          <Text className="text-xl font-bold">{expert.display_name}</Text>
          <Text className="text-gray-600">{expert.headline}</Text>
        </View>
      </View>
      <PriceTag cents={expert.hourly_rate_cents || 0} />
      <Text className="mt-4 text-gray-700">{expert.bio}</Text>

      <View className="h-6" />
      <Button title="Book a time (slots)" onPress={() => navigation.navigate('BookingMode', { expert })} />
      <View className="h-3" />
      <Button title="Send request (queue)" variant="secondary" onPress={() => navigation.navigate('RequestForm', { expert })} />
    </ScrollView>
  )
}
