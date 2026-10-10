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
      return walk.status === 'running' ? true : redirectEndedActivity(walk.status)
    }

    if (activity === 'nature') {
      return nature.status === 'active' ? true : redirectEndedActivity(nature.status)
    }

    if (activity === 'explore') {
      return explore.status === 'active' ? true : redirectEndedActivity(explore.status)
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

    if (activity === 'nature' && nature.status === 'failed') {
      return { name: 'home', replace: true }
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

    if (activity === 'nature' && nature.status === 'failed') {
      return { name: 'home', replace: true }
    }

    if (nature.status === 'completed') {
      return { name: 'journal', replace: true }
    }

    return { name: 'home', replace: true }
  }

  return true
}
