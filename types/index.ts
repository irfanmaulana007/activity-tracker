// Core Data Types for ActivityTracker Pro
import { Timestamp } from 'firebase/firestore'

// Enums
export type ActivityCategory = 'coding' | 'gaming' | 'sports'
export type ProjectStatus = 'active' | 'paused' | 'completed'
export type GameStatus = 'playing' | 'completed' | 'paused'
export type GamePlatform = 'PC' | 'Console' | 'Mobile'

// User Types
export interface User {
  userId: string
  email: string
  createdAt: Timestamp
  preferences: UserPreferences
}

export interface UserPreferences {
  favoriteProjects: string[] // project IDs
  favoriteGames: string[] // game IDs
  quickStartEnabled: boolean
}

// Location Type for Sports Activities
export interface Location {
  latitude: number
  longitude: number
  address: string
}

// Coding Project Types
export interface CodingProject {
  projectId: string
  userId: string
  name: string
  language: string
  description?: string
  status: ProjectStatus
  totalDuration: number // in seconds, calculated
  sessionCount: number // calculated
  createdAt: Timestamp
  updatedAt: Timestamp
  lastUsed: Timestamp
}

export interface CreateCodingProjectInput {
  name: string
  language: string
  description?: string
  status?: ProjectStatus
}

export interface UpdateCodingProjectInput {
  name?: string
  language?: string
  description?: string
  status?: ProjectStatus
}

// Gaming Project Types
export interface GamingProject {
  gameId: string
  userId: string
  name: string
  platform?: GamePlatform
  genre?: string
  status: GameStatus
  totalDuration: number // in seconds, calculated
  sessionCount: number // calculated
  createdAt: Timestamp
  updatedAt: Timestamp
  lastUsed: Timestamp
}

export interface CreateGamingProjectInput {
  name: string
  platform?: GamePlatform
  genre?: string
  status?: GameStatus
}

export interface UpdateGamingProjectInput {
  name?: string
  platform?: GamePlatform
  genre?: string
  status?: GameStatus
}

// Activity Types
export interface BaseActivity {
  activityId: string
  userId: string
  category: ActivityCategory
  startTime: Timestamp
  endTime: Timestamp
  duration: number // in seconds
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CodingActivity extends BaseActivity {
  category: 'coding'
  projectId: string // reference to codingProjects
  sessionResult?: string // what was accomplished
}

export interface GamingActivity extends BaseActivity {
  category: 'gaming'
  gameId: string // reference to gamingProjects
  sessionNotes?: string
}

export interface SportsActivity extends BaseActivity {
  category: 'sports'
  distance?: number // in kilometers
  pace?: number // calculated from duration/distance
  location?: Location
  avgHeartRate?: number // BPM
  maxHeartRate?: number // BPM
}

export type Activity = CodingActivity | GamingActivity | SportsActivity

export interface CreateActivityInput {
  category: ActivityCategory
  startTime: Date
  endTime: Date
  // Coding specific
  projectId?: string
  sessionResult?: string
  // Gaming specific
  gameId?: string
  sessionNotes?: string
  // Sports specific
  distance?: number
  location?: Location
  avgHeartRate?: number
  maxHeartRate?: number
}

// Project/Game Statistics
export interface ProjectStats {
  totalDuration: number
  sessionCount: number
  averageSessionLength: number
  lastUsed: Timestamp
}

export interface GameStats {
  totalDuration: number
  sessionCount: number
  averageSessionLength: number
  lastUsed: Timestamp
}

// Timer Types
export interface TimerState {
  isActive: boolean
  startTime: Date | null
  elapsedTime: number // in seconds
  category: ActivityCategory | null
  projectId?: string
  gameId?: string
}

// Quick Start Types
export interface QuickStartItem {
  id: string
  name: string
  type: 'project' | 'game'
  category: 'coding' | 'gaming'
  lastUsed: Timestamp
  totalDuration: number
}

// Search and Filter Types
export interface ProjectFilter {
  status?: ProjectStatus[]
  language?: string[]
  searchQuery?: string
}

export interface GameFilter {
  status?: GameStatus[]
  platform?: GamePlatform[]
  genre?: string[]
  searchQuery?: string
}

export interface ActivityFilter {
  category?: ActivityCategory[]
  dateRange?: {
    start: Date
    end: Date
  }
  projectId?: string
  gameId?: string
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined
  NewActivity: undefined
  Projects: undefined
  History: undefined
  Profile: undefined
  // Nested screens
  StartCoding: undefined
  StartGaming: undefined
  StartRunning: undefined
  CodingProjects: undefined
  GamingLibrary: undefined
  ProjectDetail: { projectId: string }
  GameDetail: { gameId: string }
  ActivityDetail: { activityId: string }
  EditProject: { projectId: string }
  EditGame: { gameId: string }
  CreateProject: undefined
  CreateGame: undefined
}

// Form Types
export interface FormError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: FormError[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Hook Return Types
export interface UseProjectsResult {
  projects: CodingProject[]
  loading: boolean
  error: string | null
  createProject: (input: CreateCodingProjectInput) => Promise<CodingProject>
  updateProject: (id: string, input: UpdateCodingProjectInput) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  getProjectStats: (id: string) => ProjectStats | null
}

export interface UseGamesResult {
  games: GamingProject[]
  loading: boolean
  error: string | null
  createGame: (input: CreateGamingProjectInput) => Promise<GamingProject>
  updateGame: (id: string, input: UpdateGamingProjectInput) => Promise<void>
  deleteGame: (id: string) => Promise<void>
  getGameStats: (id: string) => GameStats | null
}

export interface UseActivitiesResult {
  activities: Activity[]
  loading: boolean
  error: string | null
  createActivity: (input: CreateActivityInput) => Promise<Activity>
  updateActivity: (id: string, updates: Partial<Activity>) => Promise<void>
  deleteActivity: (id: string) => Promise<void>
}

export interface UseTimerResult {
  timerState: TimerState
  startTimer: (category: ActivityCategory, projectId?: string, gameId?: string) => void
  stopTimer: () => Promise<Activity | null>
  pauseTimer: () => void
  resumeTimer: () => void
  resetTimer: () => void
}

export interface UseQuickStartResult {
  quickStartItems: QuickStartItem[]
  loading: boolean
  getRecentProjects: () => QuickStartItem[]
  getRecentGames: () => QuickStartItem[]
  getFavoriteProjects: () => QuickStartItem[]
  getFavoriteGames: () => QuickStartItem[]
}

// Auth Types
export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  isGuest?: boolean
}

export interface UseAuthResult {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}
