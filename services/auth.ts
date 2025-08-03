// Authentication Service
import { auth, db } from './firebase'
import { COLLECTIONS } from './firestore'
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user profile in Firestore
    await createUserProfile(user.uid, email)

    return user
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error('Password reset error:', error)
    throw error
  }
}

// Create user profile in Firestore
const createUserProfile = async (userId: string, email: string): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId)
    const userData = {
      email,
      createdAt: new Date(),
      preferences: {
        favoriteProjects: [],
        favoriteGames: [],
        quickStartEnabled: true,
      },
    }

    await setDoc(userRef, userData)
  } catch (error) {
    console.error('Create user profile error:', error)
    throw error
  }
}

// Auth state listener
export const subscribeToAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null
}
