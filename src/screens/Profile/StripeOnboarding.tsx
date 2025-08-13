import React from 'react'
import { View, Text, Alert, Linking } from 'react-native'
import Button from '../../components/Button'
import { supabase } from '../../lib/supabase'

export default function StripeOnboarding() {
  const [loading, setLoading] = React.useState(false)
  async function handleSetup() {
    setLoading(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('Not signed in')
      const { data, error } = await supabase.functions.invoke('create-connect-account', { body: { user_id: user.id } })
      if (error) throw new Error(error.message)
      const { data: link, error: linkErr } = await supabase.functions.invoke('create-account-link', {
        body: { user_id: user.id, refresh_url: process.env.EXPO_PUBLIC_APP_URL_DEEP_LINK, return_url: process.env.EXPO_PUBLIC_APP_URL_DEEP_LINK }
      })
      if (linkErr) throw new Error(linkErr.message)
      await Linking.openURL(link.url)
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally { setLoading(false) }
  }
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Payouts</Text>
      <Text className="text-gray-600 mb-6">Set up your Stripe account to receive payments.</Text>
      <Button title="Set up payouts" onPress={handleSetup} loading={loading} />
    </View>
  )
}
