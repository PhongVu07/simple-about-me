export enum AchievementCategory {
  Personal = 'Personal',
  Career = 'Career',
  Education = 'Education',
}

export interface Achievement {
  id: number
  title: string
  description: string
  category: AchievementCategory
  date: Date
}
