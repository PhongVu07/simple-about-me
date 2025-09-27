import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryState, parseAsIsoDate, parseAsString } from 'nuqs'
import { AchievementCategory } from '../types'
import { useEffect } from 'react'

const filterSchema = z
  .object({
    q: z.string().optional(),
    category: z.enum(AchievementCategory).optional().nullable(),
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

export type FilterFormValues = z.infer<typeof filterSchema>

export const useAchievementFilters = () => {
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

  useEffect(() => {
    reset({
      q: titleFilter || '',
      category: (categoryFilter as AchievementCategory) || null,
      start: startDate || null,
      end: endDate || null,
    })
  }, [titleFilter, categoryFilter, startDate, endDate, reset])

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

  return {
    filters: { titleFilter, categoryFilter, startDate, endDate },
    form: { control, handleSubmit: handleSubmit(handleSearch) },
    handleClearFilters,
  }
}
