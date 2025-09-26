import React, { useEffect, useMemo } from 'react'
import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import { mockAchievements } from '../data/MOCK'
import AchievementsToolbar from '../components/AchievementsToolbar'
import AchievementsTable from '../components/AchievementsTable'
import { useAchievementFilters } from '../hooks/useAchievementFilters'
import { filterAchievements } from '../utils/achievementUtils'

const Achievements = () => {
  const { mode } = useAppSelector((state) => state.theme)
  const { filters, form, handleClearFilters } = useAchievementFilters()

  const filteredData = useMemo(() => {
    return filterAchievements(mockAchievements, filters)
  }, [filters])

  const tableRows = useMemo(() => {
    return filteredData.map((achievement) => ({
      ...achievement,
      date: new Date(achievement.date),
    }))
  }, [filteredData])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
  }, [mode])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <main className="min-h-screen bg-white px-4 pt-24 text-black sm:px-6 lg:px-8 dark:bg-black dark:text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-extrabold text-cyan-400 sm:text-5xl">
            Mission Accomplishments
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            A log of all field operations and key developments.
          </p>
          <Box sx={{ width: '100%', mt: 4 }}>
            <AchievementsToolbar
              control={form.control}
              onSubmit={form.handleSubmit}
              onClearFilters={handleClearFilters}
              mode={mode}
            />
            <AchievementsTable rows={tableRows} mode={mode} />
          </Box>
        </div>
      </main>
    </LocalizationProvider>
  )
}

export default Achievements
