import create from 'zustand'

interface BlogState {
  pageTitle: string
  setPageTitle: (payload: string) => void
}

export const useStore = create<BlogState>((set) => ({
  pageTitle: 'AT',
  setPageTitle: (payload) => set((state) => ({ pageTitle: payload }))
}))
