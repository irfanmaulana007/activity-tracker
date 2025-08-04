import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Game {
  id: string
  title: string
  platform: string
  createdAt: Date
  updatedAt: Date
}

interface GamesState {
  games: Game[]
  loading: boolean
  error: string | null
  createGame: (game: Omit<Game, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateGame: (id: string, game: Partial<Game>) => Promise<void>
  deleteGame: (id: string) => Promise<void>
  getGame: (id: string) => Game | undefined
  getGames: () => Game[]
}

export const useGamesStore = create<GamesState>()(
  persist(
    (set, get) => ({
      games: [],
      loading: false,
      error: null,

      createGame: async (gameData) => {
        set({ loading: true, error: null })
        try {
          const newGame: Game = {
            ...gameData,
            id: `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          set(state => ({
            games: [...state.games, newGame],
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create game',
            loading: false 
          })
          throw error
        }
      },

      updateGame: async (id: string, gameData) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            games: state.games.map(game => 
              game.id === id 
                ? { ...game, ...gameData, updatedAt: new Date() }
                : game
            ),
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update game',
            loading: false 
          })
          throw error
        }
      },

      deleteGame: async (id: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            games: state.games.filter(game => game.id !== id),
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete game',
            loading: false 
          })
          throw error
        }
      },

      getGame: (id: string) => {
        return get().games.find(game => game.id === id)
      },

      getGames: () => {
        return get().games
      }
    }),
    {
      name: 'games-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ games: state.games })
    }
  )
) 