import { create } from 'zustand'

export type Role = 'seeker' | 'expert' | 'both'

interface ProfileState {
  role: Role
  setRole: (r: Role) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  role: 'seeker',
  setRole: (r) => set({ role: r })
}))
