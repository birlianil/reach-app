import React from 'react'
import { View, Text, Switch } from 'react-native'
import Button from '../../components/Button'
import { useAuthStore } from '../../store/auth.store'

export default function Settings() {
  const [notif, setNotif] = React.useState(true)
  const { signOut } = useAuthStore()
  return (
    <View className="flex-1 px-6 py-8">
      <Text className="text-2xl font-bold mb-4">Settings</Text>
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-base">Notifications</Text>
        <Switch value={notif} onValueChange={setNotif} />
      </View>
      <Button title="Sign out" variant="secondary" onPress={signOut} />
    </View>
  )
}
