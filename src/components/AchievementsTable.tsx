import React, { useState } from 'react'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'
import type {
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModesModel,
} from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { toast } from 'sonner'
import type { Achievement } from '../types'
import { AchievementCategory } from '../types'

interface AchievementsTableProps {
  rows: Achievement[]
  mode: 'light' | 'dark'
  updateAchievement: (achievement: Achievement) => any
  deleteAchievement: (id: number) => any
}

const AchievementsTable = ({
  rows,
  mode,
  updateAchievement,
  deleteAchievement,
}: AchievementsTableProps) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    const promise = deleteAchievement(Number(id)).unwrap()
    toast.promise(promise, {
      loading: 'Deleting mission log...',
      success: 'Mission log deleted.',
      error: 'Failed to delete mission log.',
    })
  }

  const processRowUpdate = async (newRow: GridRowModel<Achievement>) => {
    const promise = updateAchievement(newRow).unwrap()
    toast.promise(promise, {
      loading: 'Updating mission...',
      success: `Mission "${newRow.title}" updated successfully!`,
      error: 'Failed to update mission.',
    })

    const updatedRow = await promise
    return updatedRow
  }

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.error(error)
  }, [])

  const columns: GridColDef<Achievement>[] = [
    { field: 'title', headerName: 'Title', width: 250, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 300,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: Object.values(AchievementCategory),
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      type: 'date',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              className="saveAction"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
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
        '& .saveAction': {
          color: 'primary.main',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  )
}

export default AchievementsTable
