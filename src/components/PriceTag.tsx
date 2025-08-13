import React from 'react'
import { Text } from 'react-native'

interface Props {
  cents: number
  currency?: string
}

export default function PriceTag({ cents, currency = 'USD' }: Props) {
  const amount = (cents / 100).toLocaleString(undefined, { style: 'currency', currency })
  return <Text className="text-base font-semibold">{amount}</Text>
}
