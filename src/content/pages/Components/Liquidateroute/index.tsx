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



const label = { inputProps: { 'aria-label': 'Switch demo' } };

const listEmpleados = [
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


  const [liquidate, setLiquidate] = useState({
    employee: '',
    totalCollection:' ',
    totalInitial: '',
    totalSelling: '',
    totalCash: '',
    mush:' ',
    state:''
  })

  const onChangeFormulario = e => {
    setLiquidate({
      ...liquidate,
      [e.target.name]: e.target.value
    })
  }

  const submitLiquidateRoute = (e) => {
    // Se enviaria el cliente al back
    console.log(liquidate)

    // aqui estaria la respuesta del back
    console.log("Se ha liquidado exitosamente");
  }

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
    createData(
      liquidate.employee, 
      Number(liquidate.totalCollection), 
      Number(liquidate.totalInitial), 
      Number(liquidate.totalSelling), 
      Number(liquidate.totalCash), 
      Number(liquidate.mush)
      ),
  ];


  return (
    <>
      <Helmet>
        <title>LiquidarRuta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton='Inicio'
          heading="liquidar ruta"
          subHeading="Proceso para liquidar una ruta o producido de un empleado"
          docs="/dashboards/cards" />
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
                  onClick={
                    submitLiquidateRoute
                  }
                >
                  <div>
                  <TextField
                      id="outlined-select"
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
                      name='employee'
                      value={liquidate.employee}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un empleado"
                    >
                      {listEmpleados.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Total Cobrado"
                      id="filled-start-adornment"
                      color="success"
                      name='totalCollection'
                      value={liquidate.totalCollection}
                      onChange={onChangeFormulario}
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
                      name='totalInitial'
                      value={liquidate.totalInitial}
                      onChange={onChangeFormulario}
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
                      name='totalSelling'
                      value={liquidate.totalSelling}
                      onChange={onChangeFormulario}
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
                      name='totalCash'
                      value={liquidate.totalCash}
                      onChange={onChangeFormulario}
                      sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      variant="filled"
                    />     
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Liquidación</FormLabel>
                          <RadioGroup 
                            row aria-label="Estado Liquidacion"
                            defaultValue={"Se pago"}
                            name='state'
                            value={liquidate.state}
                            onChange={onChangeFormulario}
                            >
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
