import { initStripe } from '@stripe/stripe-react-native'

export async function initStripeIfNeeded() {
  const pk = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!pk) return
  await initStripe({ publishableKey: pk, merchantIdentifier: 'merchant.com.reachapp' })
}
