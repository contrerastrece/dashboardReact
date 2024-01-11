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
// import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '../../@core/components/mui/chip'
import CustomAvatar from '../../@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from '../../@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from '../../store/apps/user'


// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/tablas/productos/TableHeader'
import SidebarAdd from 'src/views/apps/tablas/productos/SidebarAdd'

import { useProductsStore } from 'src/store/apps/products/productsStore'


const RowOptions = ({ id }) => {

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
    // dispatch(deleteUser(id))
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
    minWidth: 120,
    field: 'name',
    headerName: 'Nombre',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
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
    flex: 0.15,
    minWidth: 120,
    field: 'category',
    headerName: 'Categoria',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.id_category}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 80,
    field: 'price',
    headerName: 'Precio',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap sx={{ textTransform: 'capitalize' }}>
          S/ {row.price}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'stock',
    headerName: 'Stock',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap sx={{ textTransform: 'capitalize' }}>
        {row.stock}
      </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 75,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const Ventas = () => {
  // ** State
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })


  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const dataProducts=useProductsStore(state=>state.dataProducts);
  const showProducts=useProductsStore(state=>state.showProducts);

  useEffect(() => {
   showProducts({q:value});

  }, [value,showProducts]);
  console.log(dataProducts)

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Lista de Productos' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />

          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={dataProducts}
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

      <SidebarAdd open={addUserOpen} toggle={toggleAddUserDrawer}/>
    </Grid>
  )
}

export default Ventas
