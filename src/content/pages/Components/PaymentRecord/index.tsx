import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const currenciesSales = [
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

  const[paymentRecord, setPaymentRecord] = useState ({
    worker: ' ',
    client: ' ',
    sales: ' ',
    paymentCost: ''
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

  const submitCrearProducto = (e) => {
    // Se enviaria el cliente al back
    console.log(paymentRecord)
    

    // aqui estaria la respuesta del back
    console.log("Se ha registrado el abono exitosamente");
    
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
          subHeading="Proceso para registrar el pago cuota o abono de un cliente"
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
              <CardHeader title="Realice el pago del cliente" />
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
                      required
                      id="outlined-required"
                      label="Nombre empleado"
                      color="success"
                      name='worker'
                      value={paymentRecord.worker}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre cliente"
                      color="success"
                      name='client'
                      value={paymentRecord.client}
                      onChange={onChangeFormulario}
                    />
                  
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Compras Cliente"
                      name='sales'
                      value={paymentRecord.sales}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una venta"
                    >
                      {currenciesSales.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                <FormControl component= "fieldset" sx={{margin: 5}}>
                  <InputLabel htmlFor="standard-adornment-amount">Precio Credito</InputLabel>
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
                      <Button sx={{ margin: 5 }} variant="contained">Registrar Pago</Button>
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
