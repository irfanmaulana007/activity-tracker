/**
 * Converts seconds to HH:MM:SS format
 * @param seconds - Total seconds
 * @returns Formatted time string (e.g., "01:23:45")
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return [hours, minutes, remainingSeconds]
    .map(unit => unit.toString().padStart(2, '0'))
    .join(':')
}

/**
 * Converts seconds to a human-readable format
 * @param seconds - Total seconds
 * @returns Human-readable time string (e.g., "1h 23m 45s")
 */
export const formatTimeHuman = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const parts: string[] = []

  if (hours > 0) {
    parts.push(`${hours}h`)
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`)
  }

  return parts.join(' ')
}

/**
 * Converts seconds to a compact format
 * @param seconds - Total seconds
 * @returns Compact time string (e.g., "1:23:45" or "23:45")
 */
export const formatTimeCompact = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}

/**
 * Converts seconds to minutes and seconds format
 * @param seconds - Total seconds
 * @returns Minutes and seconds string (e.g., "23m 45s")
 */
export const formatMinutesSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return `${remainingSeconds}s`
  }

  return `${minutes}m ${remainingSeconds}s`
}

/**
 * Converts seconds to hours and minutes format
 * @param seconds - Total seconds
 * @returns Hours and minutes string (e.g., "1h 23m")
 */
export const formatHoursMinutes = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours === 0) {
    return `${minutes}m`
  }

  return `${hours}h ${minutes}m`
} 