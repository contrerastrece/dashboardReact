// ** React Imports
import { useState, useCallback } from 'react'

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

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/tablas/productos/TableHeader'
import SidebarAdd from 'src/views/apps/tablas/productos/SidebarAdd'

import { useProductsStore } from 'src/store/apps/products/productsStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {  CircularProgress } from '@mui/material'
import Sidebar from 'src/@core/components/sidebar'

const RowOptions = ({ id}) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const deleteProduct=useProductsStore(state=>state.deleteProduct);


  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

const queryClient=useQueryClient();

const deleteProductMutation=useMutation({
  mutationFn:deleteProduct,
  onSuccess:()=>{
    console.log("Producto Eliminado")
    queryClient.invalidateQueries('showProducts')
  }
})

  const handleDelete =  () => {
    deleteProductMutation.mutate(id);
    handleRowOptionsClose()
  }

  const handleEdit=()=>{
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
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
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
          {row.product}
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
          {row.category}
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
    renderCell: ({ row }) => <RowOptions id={row.id}/>
  }
]


const Ventas = () => {
  // ** State
  const [type, setType] = useState('');
  const [value, setValue] = useState('')
  const [toggle, setToggle] = useState(false)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  console.log(type)

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const showProducts = useProductsStore(state => state.showProducts)

  const { isLoading, data,isError } = useQuery({
    queryKey: ['showProducts',{q:value}],
    queryFn:  () =>showProducts({ q: value }),
  })

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Lista de Productos' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />

          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} setType={setType} />

          {isLoading ? (
            <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress sx={{ margin: '1.5rem' }} />
            </Box>
          ) : (
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          )}
        </Card>
      </Grid>

      <SidebarAdd open={addUserOpen} toggle={toggleAddUserDrawer} type={type}/>
      <Sidebar open={open} toggle={toggle} type={type}/>
    </Grid>
  )
}

export default Ventas
