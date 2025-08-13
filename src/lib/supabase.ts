import 'react-native-url-polyfill/auto'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
export const isFake = process.env.EXPO_PUBLIC_FAKE_MODE === 'true'

// Minimal stub to prevent crashes when envs are not set (FAKE/demo mode)
function createStub(): any {
  return {
    auth: {
      async getUser() { return { data: { user: null }, error: null } },
      async signOut() { return { error: null } },
      async signInWithOtp() { return { data: null, error: null } },
      async signInWithOAuth() { return { data: null, error: null } }
    },
    functions: {
      async invoke() { return { data: null, error: { message: 'FAKE_MODE' } } }
    },
    from() {
      return {
        select: () => ({
          or: () => ({ textSearch: () => ({ gte: () => ({ lte: async () => ({ data: [], error: null }) }) }) })
        }),
        insert: async () => ({ data: null, error: null }),
        upsert: async () => ({ data: null, error: null }),
        update: () => ({ eq: async () => ({ data: null, error: null }) })
      }
    }
  }
}

export const supabase: SupabaseClient | any = (!supabaseUrl || !supabaseKey)
  ? createStub()
  : createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      }
    })
