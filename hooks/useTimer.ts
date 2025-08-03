// Timer Hook
import { useActivities } from './useActivities'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import { Activity, ActivityCategory, TimerState, UseTimerResult } from '~/types'

const TIMER_STORAGE_KEY = 'timer_state'
const TIMER_INTERVAL = 1000 // 1 second

export const useTimer = (): UseTimerResult => {
  const { createActivity } = useActivities()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [timerState, setTimerState] = useState<TimerState>({
    isActive: false,
    startTime: null,
    elapsedTime: 0,
    category: null,
    projectId: undefined,
    gameId: undefined,
  })

  // Load timer state from storage on mount
  useEffect(() => {
    loadTimerState()
  }, [])

  // Save timer state to storage whenever it changes
  useEffect(() => {
    saveTimerState()
  }, [timerState])

  // Handle timer interval
  useEffect(() => {
    if (timerState.isActive && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - timerState.startTime!.getTime()) / 1000)
        setTimerState((prev) => ({ ...prev, elapsedTime: elapsed }))
      }, TIMER_INTERVAL)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState.isActive, timerState.startTime])

  const loadTimerState = async (): Promise<void> => {
    try {
      const storedState = await AsyncStorage.getItem(TIMER_STORAGE_KEY)
      if (storedState) {
        const parsedState = JSON.parse(storedState)
        if (parsedState.startTime) {
          parsedState.startTime = new Date(parsedState.startTime)
        }
        setTimerState(parsedState)
      }
    } catch (error) {
      console.error('Failed to load timer state:', error)
    }
  }

  const saveTimerState = async (): Promise<void> => {
    try {
      const stateToStore = {
        ...timerState,
        startTime: timerState.startTime?.toISOString() || null,
      }
      await AsyncStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(stateToStore))
    } catch (error) {
      console.error('Failed to save timer state:', error)
    }
  }

  const startTimer = (category: ActivityCategory, projectId?: string, gameId?: string): void => {
    const now = new Date()
    setTimerState({
      isActive: true,
      startTime: now,
      elapsedTime: 0,
      category,
      projectId,
      gameId,
    })
  }

  const stopTimer = async (): Promise<Activity | null> => {
    if (!timerState.isActive || !timerState.startTime || !timerState.category) {
      return null
    }

    const endTime = new Date()

    try {
      const activityInput = {
        category: timerState.category,
        startTime: timerState.startTime,
        endTime,
        projectId: timerState.projectId,
        gameId: timerState.gameId,
      }

      const activity = await createActivity(activityInput)

      // Reset timer state
      setTimerState({
        isActive: false,
        startTime: null,
        elapsedTime: 0,
        category: null,
        projectId: undefined,
        gameId: undefined,
      })

      return activity
    } catch (error) {
      console.error('Failed to create activity:', error)
      throw error
    }
  }

  const pauseTimer = (): void => {
    setTimerState((prev) => ({ ...prev, isActive: false }))
  }

  const resumeTimer = (): void => {
    if (timerState.startTime) {
      // Adjust start time to account for paused duration
      const now = new Date()
      const adjustedStartTime = new Date(now.getTime() - timerState.elapsedTime * 1000)
      setTimerState((prev) => ({
        ...prev,
        isActive: true,
        startTime: adjustedStartTime,
      }))
    }
  }

  const resetTimer = (): void => {
    setTimerState({
      isActive: false,
      startTime: null,
      elapsedTime: 0,
      category: null,
      projectId: undefined,
      gameId: undefined,
    })
  }

  return {
    timerState,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  }
}
