import { createTheme } from '@mui/material'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#ffffff',
              paper: '#f8fafc',
            },
          }
        : {
            background: {
              default: '#0f172a',
              paper: '#1e293b',
            },
          }),
    },
  })
