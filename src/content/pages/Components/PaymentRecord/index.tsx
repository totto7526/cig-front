import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState, useEffect} from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { formControlClasses } from '@mui/material/FormControl';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import clienteAxios from 'src/config/axios';
import Swal from 'sweetalert2';

import Switch from '@mui/material/Switch';

import { useAuth0 } from '@auth0/auth0-react';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const listSales = [
  {
    value: 1,
    label: 'Venta 1',
  },
  {
    value: 2,
    label: 'Venta 2',
  },
  {
    value: 3,
    label: 'Venta 3',
  },
  {
    value: 4,
    label: 'Venta 4',
  },
];





function PaymentRecord() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [listTrabajador, setListTrabajador] = useState([])

  const callTrabajadores = async () => {
    const response = await clienteAxios.get('/api/v1/trabajadores')
    setListTrabajador(response.data)
  }

  const [listVentas, setListVentas] = useState([])

  const callVentas = async (idCliente) => {
    const response = await clienteAxios.get(`/api/v1/ventas/cliente/${idCliente}`)
    setListVentas(response.data)
  }


  useEffect(() => {
    callTrabajadores();
    //callVentas();
  }, [])

  const [identificacion, setIdentificacion] = useState('')

  const[paymentRecord, setPaymentRecord] = useState ({
    idTrabajador:0,
    idCliente:0,
    idVenta:0,
    paymentCost:''
  })

  const[paymoneyOrshare, setPaymoneyOrshare] = useState(true)

  const onChangeFormulario = e => {
    setPaymentRecord({
      ...paymentRecord,
      [e.target.name]: e.target.value
    })
  }

  const onChangepaymoneyOrshare = e => {
    setPaymoneyOrshare(
      !paymoneyOrshare
    )
  }

  const submitCrearProducto = async(e) => {
    const response = await clienteAxios.get('/api/v1/idClientes/idCliente', { params: { identificacion:identificacion}})
    paymentRecord.idCliente = response.data.id;

     //Se enviaria el cliente al back
    //  try {
    //   const name = response.data.persona.primerNombre +' '+response.data.persona.segundoNombre+' '+response.data.persona.primerApellido

    //   await Swal.fire({
    //     title: `el abono se realizara a ${name}`,
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#30d667',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Confirmar'
    //   }).then(async(result) => {
    //     if (result.isConfirmed) {
    //       const response = await clienteAxios.post('/api/v1/ventas/crear', paymentRecord);
    //     }
    //   })
    //   // Mensaje de exito
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: 'Abono registrado exitosamente.',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   console.log("Se ha creado la venta exitosamente");
    // } catch (error) {

    //   const mensaje = error.response.data.mensaje;

    //   // mensaje de error
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error al registrar la venta',
    //     text: mensaje
    //   })
    //   console.log(error);
    // }
    
  }


  return (
    <>
      <Helmet>
        <title>Registro Abono - Registro Pago Cuota</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro Abono"
          subHeading="Proceso para registrar el pago cuota o abono de un idCliente"
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
              <CardHeader title="Realice el pago del idCliente" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 6, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                 
                >
                   <div>
                      <FormControlLabel
                        control={
                          // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                          <Switch 
                            checked={paymoneyOrshare} 
                            onChange={onChangepaymoneyOrshare} 
                            name= "check"
                          />
                        }
                        label="Pago Cuota"
                      />
                    </div>
                  <div>
                  <TextField
                      id="outlined-select"
                      select
                      label="Empleado"
                      name='idTrabajador'
                      value={paymentRecord.idTrabajador}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione el empleado"
                    >
                      {listTrabajador.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.persona.primerNombre+' '+option.persona.primerApellido}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select"
                      required
                      label="Ingrese la cedula del idCliente"
                      name='identificacion'
                      color='success'
                      value={identificacion}
                      onChange={e => setIdentificacion(e.target.value)}
                      helperText="Por favor ingrese el numero de cedula del idCliente"
                    />
                  
                    <TextField
                      id="outlined-select"
                      select
                      label="Compras idCliente"
                      name='idVenta'
                      value={paymentRecord.idVenta}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una venta"
                    >
                      {listVentas.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                <FormControl component= "fieldset" sx={{margin: 5}}>
                  <InputLabel htmlFor="standard-adornment-amount">Valor Abono</InputLabel>
                    <Input
                      required
                      id="cantidad"
                      color='success'
                      type="number"
                      name='paymentCost'
                      disabled={paymoneyOrshare}
                      value={paymentRecord.paymentCost}
                      onChange={onChangeFormulario}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                    
                    <div>
                      <Button 
                        sx={{ margin: 5 }} 
                        variant="contained"
                        onClick={
                          submitCrearProducto
                        }
                        >
                          Registrar Pago
                      </Button>
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

export default PaymentRecord;
