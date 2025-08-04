import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Project {
  id: string
  name: string
  description: string
  type: 'coding'
  createdAt: Date
  updatedAt: Date
}

interface ProjectsState {
  projects: Project[]
  loading: boolean
  error: string | null
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateProject: (id: string, project: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  getProject: (id: string) => Project | undefined
  getProjects: () => Project[]
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      loading: false,
      error: null,

      createProject: async (projectData) => {
        set({ loading: true, error: null })
        try {
          const newProject: Project = {
            ...projectData,
            id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          set(state => ({
            projects: [...state.projects, newProject],
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create project',
            loading: false 
          })
          throw error
        }
      },

      updateProject: async (id: string, projectData) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            projects: state.projects.map(project => 
              project.id === id 
                ? { ...project, ...projectData, updatedAt: new Date() }
                : project
            ),
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update project',
            loading: false 
          })
          throw error
        }
      },

      deleteProject: async (id: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            projects: state.projects.filter(project => project.id !== id),
            loading: false
          }))
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete project',
            loading: false 
          })
          throw error
        }
      },

      getProject: (id: string) => {
        return get().projects.find(project => project.id === id)
      },

      getProjects: () => {
        return get().projects
      }
    }),
    {
      name: 'projects-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ projects: state.projects })
    }
  )
) 