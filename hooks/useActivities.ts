// Activities Hook
import { useEffect, useState } from 'react'
import { createActivity, deleteActivity, subscribeToActivities } from '~/services/firestore'
import { Activity, CreateActivityInput, UseActivitiesResult } from '~/types'

export const useActivities = (): UseActivitiesResult => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToActivities((updatedActivities) => {
      setActivities(updatedActivities)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleCreateActivity = async (input: CreateActivityInput): Promise<Activity> => {
    try {
      setError(null)
      const newActivity = await createActivity(input)
      return newActivity
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create activity'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateActivity = async (id: string, updates: Partial<Activity>): Promise<void> => {
    try {
      setError(null)
      // TODO: Implement updateActivity in firestore service
      console.log('Update activity:', id, updates)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update activity'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const handleDeleteActivity = async (id: string): Promise<void> => {
    try {
      setError(null)
      await deleteActivity(id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete activity'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return {
    activities,
    loading,
    error,
    createActivity: handleCreateActivity,
    updateActivity,
    deleteActivity: handleDeleteActivity,
  }
}
