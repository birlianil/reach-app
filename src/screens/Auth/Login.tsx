import React from 'react'
import { View, Text, Alert } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../../store/auth.store'

const schema = z.object({ email: z.string().email() })

type FormValues = z.infer<typeof schema>

export default function Login({ navigation }: any) {
  const { control, handleSubmit, setValue, formState } = useForm<FormValues>({ resolver: zodResolver(schema) }) as any
  const { sendMagicLink, signInWithLinkedIn } = useAuthStore()

  async function onSubmit(values: FormValues) {
    const { error } = await sendMagicLink(values.email)
    if (error) Alert.alert('Error', error)
    else Alert.alert('Check your email', 'We sent you a magic link to sign in.')
  }

  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-6">Sign in</Text>
      <Input placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" onChangeText={t => setValue('email', t)} />
      <Button title="Send magic link" onPress={handleSubmit(onSubmit)} />
      <View className="h-4" />
      <Button title="Continue with LinkedIn" variant="secondary" onPress={async () => {
        const { error } = await signInWithLinkedIn()
        if (error) Alert.alert('Error', error)
      }} />
      <View className="h-8" />
      <Button title="Continue as guest" variant="secondary" onPress={() => navigation.navigate('HomeGuest')} />
    </View>
  )
}
