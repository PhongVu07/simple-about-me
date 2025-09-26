import React, { useEffect, useMemo } from 'react'
import { Box } from '@mui/material'
import { useQueryState, parseAsIsoDate, parseAsString } from 'nuqs'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import { mockAchievements } from '../data/MOCK'
import { AchievementCategory } from '../types'
import AchievementsToolbar from '../components/AchievementsToolbar'
import AchievementsTable from '../components/AchievementsTable'

const filterSchema = z
  .object({
    q: z.string().optional(),
    category: z.nativeEnum(AchievementCategory).optional().nullable(),
    start: z.date().optional().nullable(),
    end: z.date().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.start && data.end && data.start > data.end) {
        return false
      }
      return true
    },
    {
      message: 'Start date cannot be after end date',
      path: ['start'],
    }
  )

type FilterFormValues = z.infer<typeof filterSchema>

const Achievements = () => {
  const { mode } = useAppSelector((state) => state.theme)

  const [titleFilter, setTitleFilter] = useQueryState('q', parseAsString)
  const [categoryFilter, setCategoryFilter] = useQueryState(
    'category',
    parseAsString
  )
  const [startDate, setStartDate] = useQueryState('start', parseAsIsoDate)
  const [endDate, setEndDate] = useQueryState('end', parseAsIsoDate)

  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      q: titleFilter || '',
      category: (categoryFilter as AchievementCategory) || null,
      start: startDate || null,

      end: endDate || null,
    },
  })

  const handleSearch = (data: FilterFormValues) => {
    setTitleFilter(data.q || null)
    setCategoryFilter(data.category || null)
    setStartDate(data.start || null)
    setEndDate(data.end || null)
  }

  const handleClearFilters = () => {
    reset({ q: '', category: null, start: null, end: null })
    setTitleFilter(null)
    setCategoryFilter(null)
    setStartDate(null)
    setEndDate(null)
  }

  const filteredRows = useMemo(() => {
    let achievements = [...mockAchievements]
    if (titleFilter) {
      achievements = achievements.filter((ach) =>
        ach.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    }
    if (categoryFilter) {
      achievements = achievements.filter(
        (ach) => ach.category === categoryFilter
      )
    }
    if (startDate) {
      achievements = achievements.filter(
        (ach) =>
          dayjs(ach.date).isAfter(startDate, 'day') ||
          dayjs(ach.date).isSame(startDate, 'day')
      )
    }
    if (endDate) {
      achievements = achievements.filter(
        (ach) =>
          dayjs(ach.date).isBefore(endDate, 'day') ||
          dayjs(ach.date).isSame(endDate, 'day')
      )
    }
    return achievements.map((achievement) => ({
      ...achievement,
      date: new Date(achievement.date),
    }))
  }, [titleFilter, categoryFilter, startDate, endDate])

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
              control={control}
              onSubmit={handleSubmit(handleSearch)}
              onClearFilters={handleClearFilters}
              mode={mode}
            />
            <AchievementsTable rows={filteredRows} mode={mode} />
          </Box>
        </div>
      </main>
    </LocalizationProvider>
  )
}

export default Achievements
