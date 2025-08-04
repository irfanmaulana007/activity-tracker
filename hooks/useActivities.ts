// Activities Hook
import { useActivitiesStore } from '~/stores/useActivitiesStore'

export const useActivities = () => {
  return useActivitiesStore()
}
