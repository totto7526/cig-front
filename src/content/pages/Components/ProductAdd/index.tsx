import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';
import { Rowing } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const currenciesProductos = [
  {
    value: 1,
    label: 'tendidos',
  },
  {
    value: 2,
    label: 'cortinas',
  },
  {
    value: 3,
    label: 'sabanas',
  },
  {
    value: 4,
    label: 'tohallones',
  },
];

const currenciesMedidas = [
  {
    value: 1,
    label: '1.00 x 1.90' + ' M',
  },
  {
    value: 2,
    label: '1.40 x 1.90' + ' M',
  },
  {
    value: 3,
    label: '1.60 x 1.90' + ' M',
  },
  {
    value: 4,
    label: '2.20 x 2.90' + ' M',
  },
];


function ProductAdd() {

  const[producto, setProducto] = useState ({
    nombreProducto: '',
    referenciaProducto:'',
    descripcion:'',
    categoria:' ',
    estandar: ' ',
    largo: ' ',
    ancho: ' ',
    estado: ''
  })

  const[medidaEstandar, setMedidaEstandar] = useState(true)

  const onChangeFormulario = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const onChangeMedida = e => {
    setMedidaEstandar(
      !medidaEstandar
    )
  }

  const submitCrearProducto = (e) => {
    // Se enviaria el cliente al back
    console.log(producto)
    

    // aqui estaria la respuesta del back
    console.log("Se ha creado el producto exitosamente");
    
  }

  


  return (
    <>
      <Helmet>
        <title>RegistroProductos - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro producto"
          subHeading="Proceso para registrar un producto nuevo"
          docs='/overview' />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Datos Producto" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 6, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onClick={
                    submitCrearProducto
                  }
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre Producto"
                      color="success"
                      defaultValue=" "
                      name='nombreProducto'
                      value={producto.nombreProducto}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Referencia Producto"
                      color="success"
                      defaultValue=" "
                      name='referenciaProducto'
                      value={producto.referenciaProducto}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Descripción"
                      color='success'
                      defaultValue=" "
                      name= 'descripcion'
                      value={producto.descripcion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Categoria"
                      name='categoria'
                      value={producto.categoria}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una categoria"
                    >
                      {currenciesProductos.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <div>
                    
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo Medidas</FormLabel>
                          <RadioGroup
                             row aria-label="Tipo medidas" 
                             id='medidas'
                             name="medida"
                             defaultValue ="Estandar"
                             onChange={onChangeMedida}
                          >
                            <FormControlLabel
                              value="Estandar" 
                              control={<Radio />} 
                              label="Estandar" 
                            />
                            <FormControlLabel 
                              value="Personalizada" 
                              control={<Radio />} 
                              label="Personalizada" 
                            />
                            
                          </RadioGroup>
                        <div>
                          <TextField
                            id="est"
                            select
                            label="Estandar"
                            name='estandar'
                            disabled = {!medidaEstandar}
                            value={producto.estandar}
                            onChange={onChangeFormulario}
                            helperText="Por favor seleccione una medida"
                          >
                            {currenciesMedidas.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            id="lar"
                            label="Largo"
                            color='success'
                            type="number"
                            name='largo'
                            value={producto.largo}
                            onChange={onChangeFormulario}
                            disabled = {medidaEstandar}
                          />
                          <TextField
                            required
                            id="anch"
                            label="Ancho"
                            color='success'
                            type="number"
                            name='ancho'
                            value={producto.ancho}
                            onChange={onChangeFormulario}
                            disabled = {medidaEstandar}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Producto</FormLabel>
                          <RadioGroup 
                            row aria-label="Estado Empleado" 
                            name="estado"
                            value={producto.estado}
                            onChange={onChangeFormulario}
                          >
                            <FormControlLabel value='Activo' control={<Radio />} label="Activo" />
                            <FormControlLabel value='Inactivo' control={<Radio />} label="Inactivo" />
                          </RadioGroup>
                      </FormControl>
                    </div>
                    <div>
                      <Button sx={{ margin: 1 }} variant="contained">GUARDAR</Button>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProductAdd;
