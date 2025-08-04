// Games Hook
import { useGamesStore } from '~/stores/useGamesStore'

export const useGames = () => {
  return useGamesStore()
}
