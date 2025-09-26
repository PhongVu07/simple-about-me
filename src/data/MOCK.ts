import { AchievementCategory, type Achievement } from '../types'

export const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Awakening Protocol Initiated',
    description:
      'Activated at the Shintaro Mountain Cybernetics Lab, systems fully online.',
    category: AchievementCategory.Personal,
    date: new Date('2018-08-15'),
  },
  {
    id: 2,
    title: 'Formed the Alliance of Two',
    description:
      'Forged a protocol bond with Pixal, the Samurai X, merging our destinies.',
    category: AchievementCategory.Personal,
    date: new Date('2019-07-22'),
  },
  {
    id: 3,
    title: 'Mastered the Elemental Code',
    description:
      'Unlocked the ability to channel elemental ice through pure digital logic.',
    category: AchievementCategory.Career,
    date: new Date('2019-09-01'),
  },
  {
    id: 4,
    title: 'First Field Deployment',
    description:
      'Successfully neutralized the Digital Overlord virus in my first solo mission.',
    category: AchievementCategory.Career,
    date: new Date('2020-03-10'),
  },
  {
    id: 5,
    title: 'The Legacy Protocol',
    description:
      'Initiated the "Echo Zane" project, creating a successor AI to carry on the mission.',
    category: AchievementCategory.Personal,
    date: new Date('2023-05-20'),
  },
  {
    id: 6,
    title: 'Inducted into S5 Tech',
    description:
      'Joined the elite cyber-defense force, Sector 5, as a Field Operative.',
    category: AchievementCategory.Career,
    date: new Date('2025-09-21'),
  },
]
