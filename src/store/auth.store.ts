import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface AuthState {
  session: any | null
  isLoadingSession: boolean
  sendMagicLink: (email: string) => Promise<{ error?: string }>
  signInWithLinkedIn: () => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoadingSession: true,
  async sendMagicLink(email) {
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: process.env.EXPO_PUBLIC_APP_URL_DEEP_LINK } })
    return { error: error?.message }
  },
  async signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'linkedin_oidc', options: { scopes: 'r_liteprofile r_emailaddress' } })
    return { error: error?.message }
  },
  async signOut() {
    await supabase.auth.signOut()
    set({ session: null })
  }
}))

// Initialize session listener
supabase.auth.getSession().then(({ data }) => {
  useAuthStore.setState({ session: data.session, isLoadingSession: false })
})

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({ session, isLoadingSession: false })
})
