// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useCategoriesStore } from 'src/store/apps/categories'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useProductsStore } from 'src/store/apps/products/productsStore'
import FileUploaderSingle from 'src/components/FileUploader'
import { Avatar, Grid } from '@mui/material'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `El campo ${field} es requerido`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} deberá tener al menos ${min} caracteres`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  codebar: yup
    .string()
    .min(10, obj => showErrors('Codigo de Barra', obj.value.length, obj.min))
    .required(),
  producto: yup
    .string()
    .min(3, obj => showErrors('Producto', obj.value.length, obj.min))
    .required(),
  descripcion: yup
    .string()
    .min(3, obj => showErrors('Descripcion', obj.value.length, obj.min))
    .required(),
  cantidad: yup.number().positive('La cantidad debe ser > 0').integer('La cantidad debe ser un nro entero').required(),
  precio: yup.number().positive('El precio debe ser positivo').required()
})

const defaultValues = {
  codebar: '',
  producto: '',
  descripcion: '',
  cantidad: Number(1),
  precio: ''
}

const SidebarAdd = props => {
  // ** Props
  const { open, toggle } = props

  const [categoria, setCategoria] = useState('Categoria')
  const showCategories = useCategoriesStore(state => state.showCategories)
  const insertProducts = useProductsStore(state => state.insertProducts)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const { isLoading, data } = useQuery({
    queryKey: ['showCategories'],
    queryFn: () => showCategories({ q: '' })
  })

  const queryClient=useQueryClient();

  const insertProductMutation = useMutation({
    mutationFn: insertProducts,
    onSuccess: () => {
      queryClient.invalidateQueries('showProducts')
    },


  })

  const onSubmit = (data) => {
    insertProductMutation.mutate({
      name: data.producto,
      description: data.descripcion,
      stock: data.cantidad,
      price: data.precio,
      id_category: categoria,
      bar_code: data.codebar
    });
    setCategoria('Categoria')
    toggle()
    reset()
    console.log(data)
  }

  const handleClose = () => {
    setCategoria('Categoria')
    toggle()
    reset()
  }




  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Agregar Producto</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <Avatar
              variant='rounded'
              sx={{
                width: '100%',
                height: 200,
                backgroundColor: 'transparent',
                border: `2px dashed`,
                mb: 6
              }}
            >
              <FileUploaderSingle />
            </Avatar>
          </Grid>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='codebar'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Cod. Barra'
                  onChange={onChange}
                  placeholder='Codigo de Barra'
                  error={Boolean(errors.codebar)}
                />
              )}
            />
            {errors.codebar && <FormHelperText sx={{ color: 'error.main' }}>{errors.codebar.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='producto'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Producto'
                  onChange={onChange}
                  placeholder='Nombre de Producto'
                  error={Boolean(errors.fullName)}
                />
              )}
            />
            {errors.producto && <FormHelperText sx={{ color: 'error.main' }}>{errors.producto.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='descripcion'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Descripcion'
                  onChange={onChange}
                  placeholder='Descripcion del producto'
                  error={Boolean(errors.descripcion)}
                />
              )}
            />
            {errors.descripcion && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.descripcion.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cantidad'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Cantidad #'
                  onChange={onChange}
                  placeholder='123'
                  error={Boolean(errors.cantidad)}
                />
              )}
            />
            {errors.cantidad && <FormHelperText sx={{ color: 'error.main' }}>{errors.cantidad.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='precio'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Precio S/'
                  onChange={onChange}
                  placeholder='S/ 0.00'
                  error={Boolean(errors.precio)}
                />
              )}
            />
            {errors.precio && <FormHelperText sx={{ color: 'error.main' }}>{errors.precio.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='categoria-select'>Categoria</InputLabel>
            <Select
              fullWidth
              value={categoria}
              id='select-categoria'
              label='Seleciona Categoria'
              labelId='categoria-select'
              onChange={e => setCategoria(e.target.value)}
              inputProps={{ placeholder: 'Seleciona Categoria' }}
            >
              {data?.map(c => (
                <MenuItem value={c.id} key={c.id}>
                  {c.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Agregar
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAdd
