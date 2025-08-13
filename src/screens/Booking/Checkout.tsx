import React from 'react'
import { View, Text, Alert, Platform } from 'react-native'
import Button from '../../components/Button'
import { supabase } from '../../lib/supabase'

export default function Checkout({ navigation }: any) {
  const [loading, setLoading] = React.useState(false)

  async function setupPayment() {
    setLoading(true)
    const fakeMode = process.env.EXPO_PUBLIC_FAKE_MODE === 'true'

    try {
      if (fakeMode || Platform.OS === 'web') {
        Alert.alert('Demo mode', 'Simulate successful payment?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Simulate', onPress: () => navigation.replace('BookingSuccess') }
        ])
        return
      }

      // Dynamically import Stripe only on native
      const stripe = await import('@stripe/stripe-react-native')
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { booking_id: 1, amount_cents: 5000, currency: 'usd' }
      })
      if (error) throw new Error(error.message)

      const { error: sheetError } = await stripe.initPaymentSheet({ paymentIntentClientSecret: data.clientSecret })
      if (sheetError) throw sheetError

      const result = await stripe.presentPaymentSheet()
      if ((result as any).error) Alert.alert('Payment failed', (result as any).error.message)
      else navigation.replace('BookingSuccess')
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Payment setup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Checkout</Text>
      <Text style={{ color: '#6b7280', marginBottom: 12 }}>Note: PaymentSheet requires a Dev Client or EAS build.</Text>
      <Button title="Pay" onPress={setupPayment} loading={loading} />
    </View>
  )
}
