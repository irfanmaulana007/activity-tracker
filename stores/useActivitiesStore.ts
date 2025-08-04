import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Activity {
  activityId: string
  category: 'coding' | 'gaming' | 'running'
  startTime: Date
  endTime: Date
  duration: number // in seconds
  description?: string
}

interface ActivitiesState {
  activities: Activity[]
  loading: boolean
  error: string | null
  createActivity: (activity: Omit<Activity, 'activityId'>) => Promise<void>
  deleteActivity: (activityId: string) => Promise<void>
  getActivity: (activityId: string) => Activity | undefined
  getActivities: () => Activity[]
}

export const useActivitiesStore = create<ActivitiesState>()(
  persist(
    (set, get) => ({
      activities: [],
      loading: false,
      error: null,

      createActivity: async (activityData) => {
        set({ loading: true, error: null })
        try {
          const newActivity: Activity = {
            ...activityData,
            activityId: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          }
          
          set(state => ({
            activities: [...state.activities, newActivity],
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create activity',
            loading: false 
          })
          throw error
        }
      },

      deleteActivity: async (activityId: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            activities: state.activities.filter(activity => activity.activityId !== activityId),
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete activity',
            loading: false 
          })
          throw error
        }
      },

      getActivity: (activityId: string) => {
        return get().activities.find(activity => activity.activityId === activityId)
      },

      getActivities: () => {
        return get().activities
      }
    }),
    {
      name: 'activities-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ activities: state.activities })
    }
  )
) 