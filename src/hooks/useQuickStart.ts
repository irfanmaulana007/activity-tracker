// Quick Start Hook

import { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  UseQuickStartResult,
  QuickStartItem,
} from '../types';
import { useProjects } from './useProjects';
import { useGames } from './useGames';

export const useQuickStart = (): UseQuickStartResult => {
  const { projects } = useProjects();
  const { games } = useGames();
  const [quickStartItems, setQuickStartItems] = useState<QuickStartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateQuickStartItems();
  }, [projects, games]);

  const updateQuickStartItems = (): void => {
    const items: QuickStartItem[] = [];

    // Add recent projects (top 5)
    const recentProjects = [...projects]
      .sort((a, b) => b.lastUsed.seconds - a.lastUsed.seconds)
      .slice(0, 5)
      .map(project => ({
        id: project.projectId,
        name: project.name,
        type: 'project' as const,
        category: 'coding' as const,
        lastUsed: project.lastUsed,
        totalDuration: project.totalDuration,
      }));

    // Add recent games (top 5)
    const recentGames = [...games]
      .sort((a, b) => b.lastUsed.seconds - a.lastUsed.seconds)
      .slice(0, 5)
      .map(game => ({
        id: game.gameId,
        name: game.name,
        type: 'game' as const,
        category: 'gaming' as const,
        lastUsed: game.lastUsed,
        totalDuration: game.totalDuration,
      }));

    items.push(...recentProjects, ...recentGames);

    // Sort by last used (most recent first)
    items.sort((a, b) => b.lastUsed.seconds - a.lastUsed.seconds);

    setQuickStartItems(items.slice(0, 8)); // Show top 8 items
    setLoading(false);
  };

  const getRecentProjects = (): QuickStartItem[] => {
    return quickStartItems
      .filter(item => item.type === 'project')
      .slice(0, 5);
  };

  const getRecentGames = (): QuickStartItem[] => {
    return quickStartItems
      .filter(item => item.type === 'game')
      .slice(0, 5);
  };

  const getFavoriteProjects = (): QuickStartItem[] => {
    // TODO: Implement favorites functionality based on user preferences
    return getRecentProjects();
  };

  const getFavoriteGames = (): QuickStartItem[] => {
    // TODO: Implement favorites functionality based on user preferences
    return getRecentGames();
  };

  return {
    quickStartItems,
    loading,
    getRecentProjects,
    getRecentGames,
    getFavoriteProjects,
    getFavoriteGames,
  };
};