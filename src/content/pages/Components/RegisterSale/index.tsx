import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



const label = { inputProps: { 'aria-label': 'Switch demo' } };

const listWorker = [
  {
    value: 1,
    label: 'Ramon Elias ',
  },
  {
    value: 2,
    label: 'Elmer Galvis',
  },
  {
    value: 3,
    label: 'Esneider Alzate',
  },
];

const listClient = [
  {
    value: 1,
    label: 'Maria Camila',
  },
  {
    value: 2,
    label: 'Margarita Alzate',
  },
];

const listWaytopay = [
  {
    value: 1,
    label: 'Semanal',
  },
  {
    value: 2,
    label: 'Quincenal',
  },
  {
    value: 3,
    label: 'Mensual'
  },
];

const listModality = [
  {
    value:1,
    label:'Credito',
  },
  {
    value:2,
    label:'Contado',
  },
];

const listProduct = [
  {
    value: 1,
    label: 'Unifaz Doble Brocado',
  },
  {
    value: 2,
    label: 'Sabana Doble',
  },
];





function RegisterSale() {

  const [register, setRegister] = useState({
    empleado: '',
    cliente:'',
    formaPago: ' ',
    modalidad: ' ',
    cuotaInicial: ' ',
    producto: ' ',
    cantidad: ' ',
    descuento: ' ',
    justificacion:' '
  })
  
  const onChangeFormulario = e => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }


  const submitCrearVenta = (e) => {
    // Se enviaria el cliente al back
    console.log(register)

    // aqui estaria la respuesta del back
    console.log("Se ha creado venta correctamente");
  }
 


  return (
    <>
      <Helmet>
        <title>RegistroVenta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro Venta"
          subHeading="Proceso para registrar una venta"
          docs="/overview" />
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
              <CardHeader title="Datos Venta" />
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
                    submitCrearVenta
                  }
                >
                  <div>
                  <TextField
                      id="outlined-select"
                      select
                      label="Empleado"
                      name='empleado'
                      value={register.empleado}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione el empleado"
                    >
                      {listWorker.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Cliente"
                      name='cliente'
                      value={register.cliente}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione el cliente"
                    >
                      {listClient.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Forma Pago"
                      name='formaPago'
                      value={register.formaPago}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione la forma de pago"
                    >
                      {listWaytopay.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Modalidad"
                      name='modalidad'
                      value={register.modalidad}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione la modalidad"
                    >
                      {listModality.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="outlined-number"
                      label="Cuota Inicial"
                      color='success'
                      name='cuotaInicial'
                      value={register.cuotaInicial}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Producto"
                      name='producto'
                      value={register.producto}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un producto"
                    >
                      {listProduct.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    
                    <TextField
                      id="outlined-number"
                      label="Cantidad"
                      type="number"
                      color='success'
                      name='cantidad'
                      value={register.cantidad}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Descuento"
                      color='success'
                      name='descuento'
                      value={register.descuento}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-required"
                      label="Descripcion Descuento"
                      color='success'
                      name='justificacion'
                      value={register.justificacion}
                      onChange={onChangeFormulario}
                    />
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

export default RegisterSale;
