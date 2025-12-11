import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  // Add your state properties here
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: 'app-storage', // unique name for localStorage key
      }
    ),
    {
      name: 'AppStore', // name for Redux DevTools
    }
  )
)

