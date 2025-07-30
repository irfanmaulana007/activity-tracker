// Formatting Utilities

// Format duration from seconds to human readable format
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

// Format duration to compact format (e.g., "2h 30m")
export const formatDurationCompact = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

// Format distance (kilometers)
export const formatDistance = (kilometers: number): string => {
  if (kilometers < 1) {
    return `${(kilometers * 1000).toFixed(0)}m`;
  } else {
    return `${kilometers.toFixed(2)}km`;
  }
};

// Format pace (minutes per kilometer)
export const formatPace = (minutesPerKm: number): string => {
  const minutes = Math.floor(minutesPerKm);
  const seconds = Math.round((minutesPerKm - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
};

// Format heart rate
export const formatHeartRate = (bpm: number): string => {
  return `${bpm} BPM`;
};

// Format date to readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time to readable string
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date and time
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date);
  }
};

// Format project/game statistics
export const formatStats = (totalDuration: number, sessionCount: number) => {
  return {
    totalTime: formatDurationCompact(totalDuration),
    sessions: sessionCount,
    averageSession: sessionCount > 0 ? formatDurationCompact(totalDuration / sessionCount) : '0s',
  };
};