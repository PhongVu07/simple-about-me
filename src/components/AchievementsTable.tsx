import React from 'react'
import { Box } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { Achievement } from '../types'

interface AchievementsTableProps {
  rows: Achievement[]
  mode: 'light' | 'dark'
}

const AchievementsTable = ({ rows, mode }: AchievementsTableProps) => {
  const columns: GridColDef<Achievement>[] = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 300 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'date', headerName: 'Date', width: 180, type: 'date' },
  ]

  return (
    <Box
      sx={{
        height: 600,
        '& .MuiDataGrid-root': {
          border: '1px solid',
          borderColor: mode === 'dark' ? '#334155' : '#e2e8f0',
        },
        '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
          borderColor: mode === 'dark' ? '#334155' : '#e2e8f0',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: mode === 'dark' ? '#1e293b' : '#f8fafc',
          color: mode === 'dark' ? '#94a3b8' : '#475569',
        },
        '& .MuiIconButton-root': {
          color: mode === 'dark' ? '#94a3b8' : '#64748b',
        },
        '& .MuiTablePagination-root': {
          color: mode === 'dark' ? '#94a3b8' : '#64748b',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  )
}

export default AchievementsTable
