import create from 'zustand'

interface State {
  pageTitle: string
  theme: 'dark' | 'light'
}

interface Action {
  setPageTitle: (payload: string) => void
  setTheme: (payload: string) => void
}

export const useStore = create<State & Action>((set) => ({
  pageTitle: 'Ashley Thompson',
  theme: 'dark',
  setPageTitle: (payload) => set((state) => ({ pageTitle: payload })),
  setTheme: (payload) => set((state) => (state.theme = payload))
}))
