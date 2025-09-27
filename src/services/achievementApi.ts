import { mockAchievements } from '../data/MOCK'
import type { Achievement } from '../types'

const LOCAL_STORAGE_KEY = 'achievementsData'

const getAchievementsFromStorage = (): Achievement[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveAchievementsToStorage = (achievements: Achievement[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(achievements))
}

// Initialize if empty
const data = localStorage.getItem(LOCAL_STORAGE_KEY)
if (!data) {
  saveAchievementsToStorage(mockAchievements)
}

export const achievementApi = {
  fetchAchievements: async (): Promise<Achievement[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getAchievementsFromStorage()), 500)
    })
  },

  addAchievement: async (
    newAchievementData: Omit<Achievement, 'id'>
  ): Promise<Achievement> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const achievements = getAchievementsFromStorage()
        const newAchievement: Achievement = {
          ...newAchievementData,
          id: Math.max(0, ...achievements.map((a) => a.id)) + 1,
        }
        const updatedAchievements = [...achievements, newAchievement]
        saveAchievementsToStorage(updatedAchievements)
        resolve(newAchievement)
      }, 500)
    })
  },

  updateAchievement: async (
    updatedAchievement: Achievement
  ): Promise<Achievement> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let achievements = getAchievementsFromStorage()
        achievements = achievements.map((ach) =>
          ach.id === updatedAchievement.id ? updatedAchievement : ach
        )
        saveAchievementsToStorage(achievements)
        resolve(updatedAchievement)
      }, 500)
    })
  },

  deleteAchievement: async (id: number): Promise<{ id: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let achievements = getAchievementsFromStorage()
        achievements = achievements.filter((ach) => ach.id !== id)
        saveAchievementsToStorage(achievements)
        resolve({ id })
      }, 500)
    })
  },
}
