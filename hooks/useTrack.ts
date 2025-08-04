import { useActivities } from './useActivities'
import { useTrackStore } from '~/stores/useTrackStore'

export const useTrack = () => {
  const { createActivity } = useActivities()
  const { tracks, createTrack, cleanTracks } = useTrackStore()

  const isTracking = tracks[tracks.length - 1]?.type === 'start'

  const startTracking = async (category: 'coding' | 'gaming' | 'running') => {
    await createTrack({ type: 'start', time: new Date(), category })
  }

  const stopTracking = async () => {
    await createTrack({
      type: 'stop',
      time: new Date(),
      category: tracks[tracks.length - 1]?.category,
    })
    await createActivity({
      category: tracks[tracks.length - 1]?.category,
      startTime: tracks[tracks.length - 1]?.time,
      endTime: new Date(),
      duration: Math.floor(
        (new Date().getTime() - tracks[tracks.length - 1]?.time.getTime()) / 1000,
      ),
    })

    cleanTracks()
  }

  return {
    isTracking,
    startTracking,
    stopTracking,
  }
}
