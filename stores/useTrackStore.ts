import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Track {
  trackId: string
  category: 'coding' | 'gaming' | 'running'
  type: 'start' | 'stop'
  time: Date
}

interface TrackState {
  tracks: Track[]
  createTrack: (track: Omit<Track, 'trackId'>) => Promise<void>
  cleanTracks: () => void
}

export const useTrackStore = create<TrackState>()(
  persist(
    (set, get) => ({
      tracks: [],

      createTrack: async (trackData) => {
        try {
          const newTrack: Track = {
            ...trackData,
            trackId: `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          }

          set((state) => ({
            tracks: [...state.tracks, newTrack],
          }))
        } catch (error) {
          throw error
        }
      },
      cleanTracks: () => {
        set({ tracks: [] })
      },
    }),
    {
      name: 'track-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tracks: state.tracks }),
    },
  ),
)
