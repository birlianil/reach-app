import { create } from 'zustand'

interface BookingState {
  currentExpertId?: string
  selectedDate?: string
  reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  currentExpertId: undefined,
  selectedDate: undefined,
  reset: () => set({ currentExpertId: undefined, selectedDate: undefined })
}))
