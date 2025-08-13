import { supabase } from './supabase'

export async function getLiveKitToken(roomName: string, identity: string, name?: string) {
  const { data, error } = await supabase.functions.invoke('livekit-token', { body: { roomName, identity, name } })
  if (error) throw new Error(error.message)
  return data.token as string
}
