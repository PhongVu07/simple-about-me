import React from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { Toaster } from 'sonner'
import { useAppSelector } from './app/hooks'
import { getTheme } from './utils/theme'

function App() {
  const { mode } = useAppSelector((state) => state.theme)
  const theme = getTheme(mode)

  return (
    <div className={mode}>
      <Toaster richColors position="top-right" />
      <main>
        <NuqsAdapter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
          </ThemeProvider>
        </NuqsAdapter>
      </main>
    </div>
  )
}

export default App
