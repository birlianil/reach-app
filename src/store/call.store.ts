import { create } from 'zustand'

interface CallState {
  roomName?: string
  isMicOn: boolean
  isCamOn: boolean
  setRoom: (roomName?: string) => void
  toggleMic: () => void
  toggleCam: () => void
}

export const useCallStore = create<CallState>((set) => ({
  roomName: undefined,
  isMicOn: true,
  isCamOn: true,
  setRoom: (roomName) => set({ roomName }),
  toggleMic: () => set(s => ({ isMicOn: !s.isMicOn })),
  toggleCam: () => set(s => ({ isCamOn: !s.isCamOn }))
}))
