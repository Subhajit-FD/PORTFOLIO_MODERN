import { create } from "zustand"

interface SplashScreenState {
  isLoaded: boolean
  hasSeenSplash: boolean
  progress: number
  setLoaded: (val: boolean) => void
  setHasSeenSplash: (val: boolean) => void
  setProgress: (val: number) => void
}

export const useSplashScreenStore = create<SplashScreenState>((set) => ({
  isLoaded: false,
  hasSeenSplash: false,
  progress: 0,
  setLoaded: (val: boolean) => set({ isLoaded: val }),
  setHasSeenSplash: (val: boolean) => set({ hasSeenSplash: val }),
  setProgress: (val: number) => set({ progress: val }),
}))
