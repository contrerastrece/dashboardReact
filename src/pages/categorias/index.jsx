// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from '../../@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '../../@core/components/mui/chip'
import CustomAvatar from '../../@core/components/mui/avatar'
import CardStatisticsHorizontal from '../../@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from '../../@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from '../../store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from '../../views/apps/tablas/categorias/TableHeader'
import AddCategoria from '../../views/apps/tablas/categorias/AddCategorias'
import { useCategoriesStore } from 'src/store/apps/categories'




const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
// const renderClient = row => {
//   if (row.avatar.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row.avatarColor || 'primary'}
//         sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
//       >
//         {getInitials(row.fullName ? row.fullName : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }
// 
const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }
 
  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
       
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 30,
    field: 'id',
    headerName: 'Id',
    renderCell: ({ row }) => {

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant='body2'>
              {row.id}
            </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'description',
    headerName: 'Descripción',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.description}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 30,
    field: 'fecha',
    headerName: 'Fecha de Creacion',
    renderCell: ({ row }) => {

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant='body2'>
              {(new Date(row.created_at)).toISOString().split('T')[0]}
            </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const Ventas = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  console.log(store);
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const dataCategories=useCategoriesStore(state=>state.dataCategories);
  const showCategories=useCategoriesStore(state=>state.showCategories);
  console.log(dataCategories,'😀')
useEffect(() => {
  showCategories();
}, []);
console.log(store)
  return (
    <Grid container spacing={6}>
     
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Lista de Categorias' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={dataCategories}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>

      <AddCategoria open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default Ventas
