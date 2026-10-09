import { useWalkStore } from '@/stores/walk'
import { useNatureStore } from '@/stores/nature'
import { useExploreStore } from '@/stores/explore'

function redirectEndedActivity(status) {
  return status === 'completed'
    ? { name: 'journal', replace: true }
    : { name: 'home', replace: true }
}

export function activityGuard(to) {
  const walk = useWalkStore()
  const nature = useNatureStore()
  const explore = useExploreStore()

  const activity = to.query.activity

  if (to.name === 'outside') {
    if (activity === 'walk') {
      if (walk.status === 'running') return true
      return redirectEndedActivity(walk.status)
    }

    if (activity === 'nature') {
      if (nature.status === 'active') return true
      return redirectEndedActivity(nature.status)
    }

    if (activity === 'explore') {
      if (explore.status === 'active') return true
      return redirectEndedActivity(explore.status)
    }

    return { name: 'home', replace: true }
  }

  if (to.name === 'camera') {
    if (activity === 'nature' && nature.status === 'active') {
      return true
    }

    if (activity === 'explore' && explore.status === 'active') {
      return true
    }

    if (nature.status === 'completed' || explore.status === 'completed') {
      return { name: 'journal', replace: true }
    }

    return { name: 'home', replace: true }
  }

  if (to.name === 'verify') {
    if (activity === 'nature' && nature.status === 'verifying' && nature.photo) {
      return true
    }

    if (nature.status === 'completed') {
      return { name: 'journal', replace: true }
    }

    return { name: 'home', replace: true }
  }

  return true
}
