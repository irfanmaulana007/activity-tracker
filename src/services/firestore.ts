// Firestore Service Functions

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import {
  CodingProject,
  GamingProject,
  Activity,
  CreateCodingProjectInput,
  CreateGamingProjectInput,
  CreateActivityInput,
  UpdateCodingProjectInput,
  UpdateGamingProjectInput,
} from '../types';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  CODING_PROJECTS: 'codingProjects',
  GAMING_PROJECTS: 'gamingProjects',
  ACTIVITIES: 'activities',
} as const;

// Helper function to get current user ID
const getCurrentUserId = (): string => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  return user.uid;
};

// User Services
export const createUserProfile = async (userId: string, email: string) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userData = {
    email,
    createdAt: Timestamp.now(),
    preferences: {
      favoriteProjects: [],
      favoriteGames: [],
      quickStartEnabled: true,
    },
  };
  
  await updateDoc(userRef, userData);
  return userData;
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return { userId, ...userSnap.data() };
  }
  return null;
};

// Coding Projects Services
export const createCodingProject = async (input: CreateCodingProjectInput): Promise<CodingProject> => {
  const userId = getCurrentUserId();
  const now = Timestamp.now();
  
  const projectData = {
    userId,
    name: input.name,
    language: input.language,
    description: input.description || '',
    status: input.status || 'active',
    totalDuration: 0,
    sessionCount: 0,
    createdAt: now,
    updatedAt: now,
    lastUsed: now,
  };
  
  const docRef = await addDoc(collection(db, COLLECTIONS.CODING_PROJECTS), projectData);
  
  return {
    projectId: docRef.id,
    ...projectData,
  } as CodingProject;
};

export const updateCodingProject = async (projectId: string, input: UpdateCodingProjectInput): Promise<void> => {
  const projectRef = doc(db, COLLECTIONS.CODING_PROJECTS, projectId);
  
  const updateData = {
    ...input,
    updatedAt: Timestamp.now(),
  };
  
  await updateDoc(projectRef, updateData);
};

export const deleteCodingProject = async (projectId: string): Promise<void> => {
  const projectRef = doc(db, COLLECTIONS.CODING_PROJECTS, projectId);
  await deleteDoc(projectRef);
};

export const getCodingProjects = async (): Promise<CodingProject[]> => {
  const userId = getCurrentUserId();
  
  const q = query(
    collection(db, COLLECTIONS.CODING_PROJECTS),
    where('userId', '==', userId),
    orderBy('lastUsed', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    projectId: doc.id,
    ...doc.data(),
  })) as CodingProject[];
};

export const getCodingProject = async (projectId: string): Promise<CodingProject | null> => {
  const projectRef = doc(db, COLLECTIONS.CODING_PROJECTS, projectId);
  const projectSnap = await getDoc(projectRef);
  
  if (projectSnap.exists()) {
    return {
      projectId: projectSnap.id,
      ...projectSnap.data(),
    } as CodingProject;
  }
  
  return null;
};

// Gaming Projects Services
export const createGamingProject = async (input: CreateGamingProjectInput): Promise<GamingProject> => {
  const userId = getCurrentUserId();
  const now = Timestamp.now();
  
  const gameData = {
    userId,
    name: input.name,
    platform: input.platform,
    genre: input.genre,
    status: input.status || 'playing',
    totalDuration: 0,
    sessionCount: 0,
    createdAt: now,
    updatedAt: now,
    lastUsed: now,
  };
  
  const docRef = await addDoc(collection(db, COLLECTIONS.GAMING_PROJECTS), gameData);
  
  return {
    gameId: docRef.id,
    ...gameData,
  } as GamingProject;
};

export const updateGamingProject = async (gameId: string, input: UpdateGamingProjectInput): Promise<void> => {
  const gameRef = doc(db, COLLECTIONS.GAMING_PROJECTS, gameId);
  
  const updateData = {
    ...input,
    updatedAt: Timestamp.now(),
  };
  
  await updateDoc(gameRef, updateData);
};

export const deleteGamingProject = async (gameId: string): Promise<void> => {
  const gameRef = doc(db, COLLECTIONS.GAMING_PROJECTS, gameId);
  await deleteDoc(gameRef);
};

export const getGamingProjects = async (): Promise<GamingProject[]> => {
  const userId = getCurrentUserId();
  
  const q = query(
    collection(db, COLLECTIONS.GAMING_PROJECTS),
    where('userId', '==', userId),
    orderBy('lastUsed', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    gameId: doc.id,
    ...doc.data(),
  })) as GamingProject[];
};

export const getGamingProject = async (gameId: string): Promise<GamingProject | null> => {
  const gameRef = doc(db, COLLECTIONS.GAMING_PROJECTS, gameId);
  const gameSnap = await getDoc(gameRef);
  
  if (gameSnap.exists()) {
    return {
      gameId: gameSnap.id,
      ...gameSnap.data(),
    } as GamingProject;
  }
  
  return null;
};

// Activity Services
export const createActivity = async (input: CreateActivityInput): Promise<Activity> => {
  const userId = getCurrentUserId();
  
  const duration = Math.floor((input.endTime.getTime() - input.startTime.getTime()) / 1000);
  
  const activityData = {
    userId,
    category: input.category,
    startTime: Timestamp.fromDate(input.startTime),
    endTime: Timestamp.fromDate(input.endTime),
    duration,
    // Coding specific
    ...(input.projectId && { projectId: input.projectId }),
    ...(input.sessionResult && { sessionResult: input.sessionResult }),
    // Gaming specific
    ...(input.gameId && { gameId: input.gameId }),
    ...(input.sessionNotes && { sessionNotes: input.sessionNotes }),
    // Sports specific
    ...(input.distance && { distance: input.distance }),
    ...(input.location && { location: input.location }),
    ...(input.avgHeartRate && { avgHeartRate: input.avgHeartRate }),
    ...(input.maxHeartRate && { maxHeartRate: input.maxHeartRate }),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  // Calculate pace for sports activities
  if (input.category === 'sports' && input.distance && duration > 0) {
    (activityData as any).pace = duration / input.distance / 60; // minutes per km
  }
  
  const docRef = await addDoc(collection(db, COLLECTIONS.ACTIVITIES), activityData);
  
  // Update project/game statistics
  if (input.projectId) {
    await updateProjectStats(input.projectId, duration);
  }
  if (input.gameId) {
    await updateGameStats(input.gameId, duration);
  }
  
  return {
    activityId: docRef.id,
    ...activityData,
  } as Activity;
};

export const getActivities = async (constraints: QueryConstraint[] = []): Promise<Activity[]> => {
  const userId = getCurrentUserId();
  
  const baseConstraints = [
    where('userId', '==', userId),
    orderBy('startTime', 'desc'),
  ];
  
  const q = query(
    collection(db, COLLECTIONS.ACTIVITIES),
    ...baseConstraints,
    ...constraints
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    activityId: doc.id,
    ...doc.data(),
  })) as Activity[];
};

export const getActivity = async (activityId: string): Promise<Activity | null> => {
  const activityRef = doc(db, COLLECTIONS.ACTIVITIES, activityId);
  const activitySnap = await getDoc(activityRef);
  
  if (activitySnap.exists()) {
    return {
      activityId: activitySnap.id,
      ...activitySnap.data(),
    } as Activity;
  }
  
  return null;
};

export const deleteActivity = async (activityId: string): Promise<void> => {
  const activityRef = doc(db, COLLECTIONS.ACTIVITIES, activityId);
  await deleteDoc(activityRef);
};

// Helper functions for updating project/game statistics
const updateProjectStats = async (projectId: string, additionalDuration: number): Promise<void> => {
  const projectRef = doc(db, COLLECTIONS.CODING_PROJECTS, projectId);
  const projectSnap = await getDoc(projectRef);
  
  if (projectSnap.exists()) {
    const currentData = projectSnap.data();
    await updateDoc(projectRef, {
      totalDuration: (currentData.totalDuration || 0) + additionalDuration,
      sessionCount: (currentData.sessionCount || 0) + 1,
      lastUsed: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
};

const updateGameStats = async (gameId: string, additionalDuration: number): Promise<void> => {
  const gameRef = doc(db, COLLECTIONS.GAMING_PROJECTS, gameId);
  const gameSnap = await getDoc(gameRef);
  
  if (gameSnap.exists()) {
    const currentData = gameSnap.data();
    await updateDoc(gameRef, {
      totalDuration: (currentData.totalDuration || 0) + additionalDuration,
      sessionCount: (currentData.sessionCount || 0) + 1,
      lastUsed: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
};

// Real-time listeners
export const subscribeToCodingProjects = (callback: (projects: CodingProject[]) => void) => {
  const userId = getCurrentUserId();
  
  const q = query(
    collection(db, COLLECTIONS.CODING_PROJECTS),
    where('userId', '==', userId),
    orderBy('lastUsed', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const projects = querySnapshot.docs.map(doc => ({
      projectId: doc.id,
      ...doc.data(),
    })) as CodingProject[];
    
    callback(projects);
  });
};

export const subscribeToGamingProjects = (callback: (games: GamingProject[]) => void) => {
  const userId = getCurrentUserId();
  
  const q = query(
    collection(db, COLLECTIONS.GAMING_PROJECTS),
    where('userId', '==', userId),
    orderBy('lastUsed', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const games = querySnapshot.docs.map(doc => ({
      gameId: doc.id,
      ...doc.data(),
    })) as GamingProject[];
    
    callback(games);
  });
};

export const subscribeToActivities = (
  callback: (activities: Activity[]) => void,
  constraints: QueryConstraint[] = []
) => {
  const userId = getCurrentUserId();
  
  const baseConstraints = [
    where('userId', '==', userId),
    orderBy('startTime', 'desc'),
  ];
  
  const q = query(
    collection(db, COLLECTIONS.ACTIVITIES),
    ...baseConstraints,
    ...constraints
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const activities = querySnapshot.docs.map(doc => ({
      activityId: doc.id,
      ...doc.data(),
    })) as Activity[];
    
    callback(activities);
  });
};