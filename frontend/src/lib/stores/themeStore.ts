import create from 'zustand'
import { persist } from 'zustand/middleware'

import { THEME_DARK, THEME_LIGHT } from 'constants/theme'

interface State {
  theme: 'dark' | 'light'
}

interface Action {
  toggleTheme: () => void
}

export const useThemeStore = create<State & Action>()(
  persist(
    (set, get) => ({
      theme: THEME_DARK, // key assigned to state object in LocalStorage
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
        }))
    }),
    {
      name: 'AT_STATE'
    }
  )
)
