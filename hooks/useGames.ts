// Gaming Projects Hook
import { useEffect, useState } from 'react'
import {
  createGamingProject,
  deleteGamingProject,
  subscribeToGamingProjects,
  updateGamingProject,
} from '~/services/firestore'
import {
  CreateGamingProjectInput,
  GameStats,
  GamingProject,
  UpdateGamingProjectInput,
  UseGamesResult,
} from '~/types'

export const useGames = (): UseGamesResult => {
  const [games, setGames] = useState<GamingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToGamingProjects((updatedGames) => {
      setGames(updatedGames)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const createGame = async (input: CreateGamingProjectInput): Promise<GamingProject> => {
    try {
      setError(null)
      const newGame = await createGamingProject(input)
      return newGame
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create game'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateGame = async (id: string, input: UpdateGamingProjectInput): Promise<void> => {
    try {
      setError(null)
      await updateGamingProject(id, input)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update game'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const deleteGame = async (id: string): Promise<void> => {
    try {
      setError(null)
      await deleteGamingProject(id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete game'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const getGameStats = (id: string): GameStats | null => {
    const game = games.find((g) => g.gameId === id)
    if (!game) return null

    return {
      totalDuration: game.totalDuration,
      sessionCount: game.sessionCount,
      averageSessionLength: game.sessionCount > 0 ? game.totalDuration / game.sessionCount : 0,
      lastUsed: game.lastUsed,
    }
  }

  return {
    games,
    loading,
    error,
    createGame,
    updateGame,
    deleteGame,
    getGameStats,
  }
}
