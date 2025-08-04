import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  isGuest?: boolean
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  continueAsGuest: () => void
  resetPassword: (email: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      signIn: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const user: AuthUser = {
            uid: `user-${Date.now()}`,
            email,
            displayName: email.split('@')[0],
            isGuest: false
          }
          
          set({ user, loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign in',
            loading: false 
          })
          throw error
        }
      },

      signUp: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const user: AuthUser = {
            uid: `user-${Date.now()}`,
            email,
            displayName: email.split('@')[0],
            isGuest: false
          }
          
          set({ user, loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign up',
            loading: false 
          })
          throw error
        }
      },

      signOut: async () => {
        set({ loading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
          set({ user: null, loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign out',
            loading: false 
          })
          throw error
        }
      },

      continueAsGuest: () => {
        const user: AuthUser = {
          uid: `guest-${Date.now()}`,
          email: null,
          displayName: 'Guest',
          isGuest: true
        }
        set({ user, loading: false })
      },

      resetPassword: async (email: string) => {
        set({ loading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          set({ loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to reset password',
            loading: false 
          })
          throw error
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
) 