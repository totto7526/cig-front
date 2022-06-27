import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, InputAdornment } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const currenciesEmpleados = [
  {
    value: 1,
    label: 'Pepito Rodrigues',
  },
  {
    value: 2,
    label: 'Juana Maria',
  },
  {
    value:3,
    label:'   ',
  },
];


function Liquidateroute() {

  const [currencyEmpleados, setCurrencyEmpleados] = useState(' ');

  const handleChangeEmpleados= (event) => {
    setCurrencyEmpleados(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Helmet>
        <title>LiquidarRuta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="liquidar ruta"
          subHeading="Proceso para liquidar una ruta o producido de un empleado"
          docs="https://material-ui.com/components/text-fields/" />
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
              <CardHeader title="Datos Producido" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { mr: 10, mb:5, ml:5, mt:5, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                  <TextField
                      id="outlined-select-currency"
                      select
                      label="Empleado"
                      defaultValue=' '
                      value={currencyEmpleados}
                      onChange={handleChangeEmpleados}
                      helperText="Por favor seleccione un empleado"
                    >
                      {currenciesEmpleados.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Total Cobrado"
                      id="filled-start-adornment"
                      color="success"
                      sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      variant="filled"
                    />   
                    <TextField
                      label="Total Iniciales"
                      id="filled-start-adornment"
                      color="success"
                      sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      variant="filled"
                    />   
                    <TextField
                      label="Total Ventas"
                      id="filled-start-adornment"
                      color="success"
                      sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      variant="filled"
                    />        
                    <TextField
                      label="Total en Efectivo"
                      id="filled-start-adornment"
                      color="success"
                      sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      variant="filled"
                    />     
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Liquidación</FormLabel>
                          <RadioGroup row aria-label="Estado Liquidacion" name="row-radio-buttons-group"defaultValue={"Se pago"}>
                            <FormControlLabel value="Se pago" control={<Radio />} label="Se pago" />
                            <FormControlLabel value="Sin pagar" control={<Radio />} label="Sin pagar" />
                           <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                          </RadioGroup>
                      </FormControl>
                    </div>
                    <div>
                      <Button sx={{ margin: 1 }} variant="contained">Liquidar</Button>
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

export default Liquidateroute;
