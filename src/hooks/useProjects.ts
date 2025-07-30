// Coding Projects Hook

import { useState, useEffect } from 'react';
import {
  createCodingProject,
  updateCodingProject,
  deleteCodingProject,
  subscribeToCodingProjects,
} from '../services/firestore';
import {
  CodingProject,
  CreateCodingProjectInput,
  UpdateCodingProjectInput,
  UseProjectsResult,
  ProjectStats,
} from '../types';

export const useProjects = (): UseProjectsResult => {
  const [projects, setProjects] = useState<CodingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCodingProjects((updatedProjects) => {
      setProjects(updatedProjects);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createProject = async (input: CreateCodingProjectInput): Promise<CodingProject> => {
    try {
      setError(null);
      const newProject = await createCodingProject(input);
      return newProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateProject = async (id: string, input: UpdateCodingProjectInput): Promise<void> => {
    try {
      setError(null);
      await updateCodingProject(id, input);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      setError(null);
      await deleteCodingProject(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getProjectStats = (id: string): ProjectStats | null => {
    const project = projects.find(p => p.projectId === id);
    if (!project) return null;

    return {
      totalDuration: project.totalDuration,
      sessionCount: project.sessionCount,
      averageSessionLength: project.sessionCount > 0 ? project.totalDuration / project.sessionCount : 0,
      lastUsed: project.lastUsed,
    };
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    getProjectStats,
  };
};