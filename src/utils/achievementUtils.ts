import dayjs from 'dayjs'
import { type Achievement } from '../types'

interface Filters {
  titleFilter: string | null
  categoryFilter: string | null
  startDate: Date | null
  endDate: Date | null
}

export const filterAchievements = (
  achievements: Achievement[],
  filters: Filters
): Achievement[] => {
  const { titleFilter, categoryFilter, startDate, endDate } = filters

  let filtered = [...achievements]

  if (titleFilter) {
    filtered = filtered.filter((ach) =>
      ach.title.toLowerCase().includes(titleFilter.toLowerCase())
    )
  }
  if (categoryFilter) {
    filtered = filtered.filter((ach) => ach.category === categoryFilter)
  }
  if (startDate) {
    filtered = filtered.filter(
      (ach) =>
        dayjs(ach.date).isAfter(startDate, 'day') ||
        dayjs(ach.date).isSame(startDate, 'day')
    )
  }
  if (endDate) {
    filtered = filtered.filter(
      (ach) =>
        dayjs(ach.date).isBefore(endDate, 'day') ||
        dayjs(ach.date).isSame(endDate, 'day')
    )
  }

  return filtered
}
