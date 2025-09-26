import React, { useState, useEffect, useMemo } from 'react'
import { Box, CircularProgress, Alert, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'sonner'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import AchievementsToolbar from '../components/AchievementsToolbar'
import AchievementsTable from '../components/AchievementsTable'
import AchievementDialog from '../components/AchievementDialog'
import { useAchievementFilters } from '../hooks/useAchievementFilters'
import { filterAchievements } from '../utils/achievementUtils'
import {
  useGetAchievementsQuery,
  useAddAchievementMutation,
  useDeleteAchievementMutation,
} from '../features/api/apiSlice'
import type { Achievement } from '../types'

const Achievements = () => {
  const { mode } = useAppSelector((state) => state.theme)
  const { filters, form, handleClearFilters } = useAchievementFilters()

  const [isDialogOpen, setDialogOpen] = useState(false)

  const {
    data: achievements = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetAchievementsQuery()
  const [addAchievement, { isLoading: isAdding }] = useAddAchievementMutation()
  const [deleteAchievement] = useDeleteAchievementMutation()

  const filteredData = useMemo(
    () => filterAchievements(achievements, filters),
    [achievements, filters]
  )
  const tableRows = useMemo(
    () => filteredData.map((ach) => ({ ...ach, date: new Date(ach.date) })),
    [filteredData]
  )

  const handleDialogSubmit = async (data: Omit<Achievement, 'id'>) => {
    const promise = addAchievement(data).unwrap()

    toast.promise(promise, {
      loading: 'Saving new mission...',
      success: (newAchievement) =>
        `Mission "${newAchievement.title}" was successfully logged!`,
      error: 'Failed to log mission.',
    })

    try {
      await promise
      setDialogOpen(false)
    } catch (err) {
      // Errors are handled by the toast.
    }
  }

  const handleDelete = (id: number) => {
    const promise = deleteAchievement(id).unwrap()

    toast.promise(promise, {
      loading: 'Deleting mission log...',
      success: 'Mission log deleted.',
      error: 'Failed to delete mission log.',
    })
  }

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
  }, [mode])

  let content
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
        }}
      >
        <CircularProgress />
      </Box>
    )
  } else if (isSuccess) {
    content = (
      <AchievementsTable rows={tableRows} mode={mode} onDelete={handleDelete} />
    )
  } else if (isError) {
    content = <Alert severity="error">Failed to load achievements.</Alert>
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <main className="min-h-screen bg-white px-4 pt-24 text-black sm:px-6 lg:px-8 dark:bg-black dark:text-white">
        <div className="mx-auto max-w-7xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <div>
              <h1 className="text-4xl font-extrabold text-cyan-400 sm:text-5xl">
                Mission Accomplishments
              </h1>
              <p className="mt-2 text-lg text-slate-400">
                A log of all field operations and key developments.
              </p>
            </div>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
              sx={{
                bgcolor: 'rgb(6 182 212)',
                '&:hover': { bgcolor: 'rgb(8 145 178)' },
              }}
            >
              Log New Mission
            </Button>
          </Box>
          <Box sx={{ width: '100%', mt: 2 }}>
            <AchievementsToolbar
              control={form.control}
              onSubmit={form.handleSubmit}
              onClearFilters={handleClearFilters}
              mode={mode}
            />
            {content}
          </Box>
        </div>
        <AchievementDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleDialogSubmit}
          isLoading={isAdding}
        />
      </main>
    </LocalizationProvider>
  )
}

export default Achievements
