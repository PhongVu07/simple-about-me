import React from 'react'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, type Control } from 'react-hook-form'
import dayjs from 'dayjs'
import { AchievementCategory } from '../types'

interface AchievementsToolbarProps {
  control: Control<any>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onClearFilters: () => void
  mode: 'light' | 'dark'
}

const categories = Object.values(AchievementCategory)

const AchievementsToolbar = ({
  control,
  onSubmit,
  onClearFilters,
  mode,
}: AchievementsToolbarProps) => {
  const borderColor = mode === 'dark' ? '#334155' : '#e2e8f0'
  const hoverBorderColor = mode === 'dark' ? '#475569' : '#cbd5e1'
  const labelColor = mode === 'dark' ? '#94a3b8' : '#64748b'
  const inputColor = mode === 'dark' ? '#e2e8f0' : '#0f172a'
  const iconColor = mode === 'dark' ? '#94a3b8' : '#64748b'

  const commonInputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: borderColor },
      '&:hover fieldset': { borderColor: hoverBorderColor },
      '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
    },
    '& .MuiInputLabel-root': { color: labelColor },
    '& .MuiOutlinedInput-input': { color: inputColor },
    '& .MuiSvgIcon-root': { color: iconColor },
  }

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Controller
          name="q"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Search by Title"
              variant="outlined"
              size="small"
              sx={{ ...commonInputStyles, flexGrow: 1, minWidth: '200px' }}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl
              size="small"
              sx={{ minWidth: 150, ...commonInputStyles }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                {...field}
                value={field.value || ''}
                label="Category"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: mode === 'dark' ? 'rgb(30, 41, 59)' : '#ffffff',
                      color: inputColor,
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="From Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date ? date.toDate() : null)}
              slotProps={{
                textField: { size: 'small', sx: commonInputStyles },
              }}
            />
          )}
        />
        <Controller
          name="end"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="To Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date ? date.toDate() : null)}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: commonInputStyles,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'rgb(6 182 212)',
            '&:hover': { bgcolor: 'rgb(8 145 178)' },
          }}
        >
          Search
        </Button>
        <Button
          type="button"
          onClick={onClearFilters}
          variant="outlined"
          sx={{
            borderColor: borderColor,
            color: labelColor,
            '&:hover': {
              borderColor: hoverBorderColor,
              backgroundColor: 'action.hover',
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </form>
  )
}

export default AchievementsToolbar
