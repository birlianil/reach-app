import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { supabase } from './supabase'

export async function registerForPushNotificationsAsync() {
  let token
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') return null
  token = (await Notifications.getExpoPushTokenAsync()).data

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX
    })
  }

  const user = (await supabase.auth.getUser()).data.user
  if (user && token) {
    await supabase.from('notifications').insert({ user_id: user.id, title: 'device_token', body: token })
  }
  return token
}
