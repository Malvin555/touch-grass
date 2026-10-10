import { MISSION_LABELS } from '@/constants/mission_labels'

function labelMatches(label, allowedLabels) {
  const normalized = label.toLowerCase().trim()

  return allowedLabels.some((allowed) => {
    return normalized === allowed || normalized.split(/[\s_-]+/).includes(allowed)
  })
}

export function validateMission(missionId, labels) {
  const allowedLabels = MISSION_LABELS[missionId] ?? []

  const candidates = labels.filter((label) => label.confidence >= 0.15)

  const matchedLabel = candidates.find((label) => labelMatches(label.text, allowedLabels))

  if (matchedLabel) {
    return {
      valid: true,
      matchedLabel: matchedLabel.text,
      message: `AI identified ${matchedLabel.text}, which is relevant to this mission.`,
    }
  }

  return {
    valid: false,
    matchedLabel: null,
    message: 'The AI could not identify an object relevant to this mission.',
  }
}
