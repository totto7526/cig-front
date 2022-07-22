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
import AccountCircle from '@mui/icons-material/AccountCircle';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Collections } from '@mui/icons-material';

function createData(
  name: string,
  collection: number,
  initials: number,
  sales: number,
  cash: number,
  must: number,
) {
  return { name, collection, initials, sales, cash, must};
}


const rows = [
  createData('Total Dia',500000, 35000, 60000, 535000,0),
];


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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                         </InputAdornment>
                        ),
                      }}
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
                          </RadioGroup>
                      </FormControl>
                    </div>
                    <div>
                      <Button sx={{ margin: 1 }} variant="contained">Liquidar</Button>
                    </div>
                  </div>

                  <div>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Resumen Producido</TableCell>
                            <TableCell align="right">Cobrado($)</TableCell>
                            <TableCell align="right">Iniciales($)</TableCell>
                            <TableCell align="right">Ventas($)</TableCell>
                            <TableCell align="right">Efectivo($)</TableCell>
                            <TableCell align='right'>Deuda($)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                    
                              <TableCell align="right">{row.collection}</TableCell>
                              <TableCell align="right">{row.initials}</TableCell>
                              <TableCell align="right">{row.sales}</TableCell>
                              <TableCell align="right">{row.cash}</TableCell>
                              <TableCell align="right">{row.must = (row.collection + row.initials)-row.cash}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
