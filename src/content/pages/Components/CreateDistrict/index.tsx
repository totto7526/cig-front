import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState, useEffect} from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button} from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import clienteAxios from  'src/config/axios';
import Swal from 'sweetalert2';


function CreateRuteOptions() {

  const [country, setCountry] = useState([ ])

  const callCountry = async() => {
    const response = await clienteAxios.get('/api/v1/rutas/paises')
    setCountry(response.data)
  }

 

  const [departament, setDepartament] = useState([ ])
  const [region, setRegion] = useState([ ])
  const [city, setCity] = useState([])
  const [district, setDistrict] = useState([])
  const [zone, setZone] = useState([])

  useEffect(() => {
    callCountry();
}, [])

  const [CreateRuteOptions, setCreateRuteOptions] = useState({
    idPais:0,
    newCountry:'',
    idDepartamento:0,
    newDepartament:'',
    idRegion:0,
    newRegion:'',
    idCiudad:0,
    newCity:'',
    idZona:0,
    newZone:'',
    idBarrio:0,
    newDistrict:''
  })

  useEffect(() => {
    if (CreateRuteOptions.idPais != 0){
      const callPais = async()=>{
        const response = await clienteAxios.get(`/api/v1/rutas/departamentos/${CreateRuteOptions.idPais}`)
        setDepartament(response.data)
      }
      callPais();
     
    }

    if (CreateRuteOptions.idDepartamento != 0){
      const CallDepartament = async() =>{
        const response = await clienteAxios.get(`/api/v1/rutas/regiones/${CreateRuteOptions.idDepartamento}`)
        setRegion(response.data)
      }
        CallDepartament();
    }

    if (CreateRuteOptions.idRegion != 0){
      const CallRegion = async() =>{
        const response = await clienteAxios.get(`/api/v1/rutas/ciudades/${CreateRuteOptions.idRegion}`)
        setCity(response.data)
      }
      CallRegion();
    }

    if (CreateRuteOptions.idCiudad != 0){
        const callCity = async() => {
            const response = await clienteAxios.get(`/api/v1/rutas/barrios/${CreateRuteOptions.idCiudad}`)
            setDistrict(response.data)
          }
          callCity();
    }
    if (CreateRuteOptions.idZona != 0){
        const callZone = async() => {
            const response = await clienteAxios.get(`/api/v1/rutas/zonas/${CreateRuteOptions.idZona}`)
            setZone(response.data)
          }
          callZone();
    }

    console.log(CreateRuteOptions)
  }, [CreateRuteOptions])


  const[createDistrict, setcreateDistrict] = useState(false)

  const onChangeDistrict = e =>{
    setcreateDistrict(
        !createDistrict
    )
  }

  const onChangeFormulario = (e, option) => {
    setCreateRuteOptions({
      ...CreateRuteOptions,
      [e.target.name]: e.target.value
    })
    console.log(CreateRuteOptions)
    switch(option){
      case "country":
        console.log("Paiiiis"+" "+ CreateRuteOptions.idPais)
        break;
      default: 
        console.log("No esta")
        break;
    }
  };

  const submitCreateRouteOptions = async(e) => {
    try{
      console.log(CreateRuteOptions);
      const response = await clienteAxios.post(' ', CreateRuteOptions);
      // Mensaje de exito
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ruta  registrada exitosamente.',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("Se ha creado la ruta exitosamente");
    }catch(error){

      const mensaje = error.response.data.mensaje;

      // mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la ruta',
        text: mensaje
     })
      console.log(error);
    }
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Ruta Nueva - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nuevo barrio"
          subHeading="Proceso para crear un nuevo barrio"
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
              <CardHeader title="Asigna un nuevo barrio o cree uno nuevo para asignar a una ruta establecida" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m:5, ml:10, width: '35ch' },
                  }}
                  noValidate
                  autoComplete="off"
                > 
                  <div>
                      <TextField
                        id="outlined-select"
                        select
                        label="Pais"
                        name='idPais'
                        color='success'
                        value={CreateRuteOptions.idPais}
                        onChange={e => {onChangeFormulario(e,"country")}}
                        helperText="Por favor seleccione un pais"
                      >
                        {country.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select"
                        select
                        label="Departamento"
                        name='idDepartamento'
                        color='success'
                        value={CreateRuteOptions.idDepartamento}
                        onChange={e => {onChangeFormulario(e,"departament")}}
                        helperText="Por favor seleccione un departamento"
                      >
                        {departament.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select"
                        select
                        label="Region"
                        name='idRegion'
                        color='success'
                        value={CreateRuteOptions.idRegion}
                        onChange={e => {onChangeFormulario(e,"region")}}
                        helperText="Por favor seleccione una region"
                      >
                        {region.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select"
                        select
                        label="Ciudad"
                        name='idCiudad'
                        color='success'
                        value={CreateRuteOptions.idCiudad}
                        onChange={e => {onChangeFormulario(e,"city")}}
                        helperText="Por favor seleccione una ciudad"
                      >
                        {city.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField> 
                      <TextField
                        id="outlined-select"
                        select
                        label="Zona"
                        name='idZona'
                        color='success'
                        value={CreateRuteOptions.idZona}
                        onChange={e => {onChangeFormulario(e,"zone")}}
                        helperText="Por favor ingrese la nueva zona"
                      >
                        {zone.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                    </TextField>
                    <div>
                      <FormControlLabel
                        control={
                          // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                          <Switch 
                            checked={createDistrict} 
                            onChange={onChangeDistrict} 
                            name= "check"
                          />
                        }
                        label="Nuevo"
                      />
                      <TextField
                        id="outlined-select"
                        select
                        label="Barrio"
                        name='idBarrio'
                        color='success'
                        value={CreateRuteOptions.idBarrio}
                        onChange={e => {onChangeFormulario(e,"barrio")}}
                        disabled = {createDistrict}
                        helperText="Por favor seleccione un barrio o cree uno nuevo"
                      >
                        {district.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select"
                        required
                        label="Nuevo Barrio"
                        name='newDistrict'
                        color='success'
                        value={CreateRuteOptions.newDistrict}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        disabled = {!createDistrict}
                        helperText="Por favor ingrese el nuevo barrio"
                      />
                  </div>
                  <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/opcionesRuta/gestion_rutas/opciones-ruta"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/opcionesRuta/gestion_rutas/opciones-ruta"
                        onClick={
                          submitCreateRouteOptions
                        }
                        >
                       
                          Guardar Ruta
                          
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

export default CreateRuteOptions;
