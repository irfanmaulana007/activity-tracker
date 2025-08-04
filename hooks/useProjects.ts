// Projects Hook
import { useProjectsStore } from '~/stores/useProjectsStore'

export const useProjects = () => {
  return useProjectsStore()
}
