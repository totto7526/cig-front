
import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import Footer from "src/components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

const label = { inputProps: { "aria-label": "Switch demo" } };

function WorkerToEdit({worker}) {

  const theme = useTheme();
  let navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [neighborhood, setNeighborhood] = useState([]);
  const [city, setCity] = useState([]);
  const [idCiudad, setIdCiudad] = useState(worker.persona.barrio.zona.ciudad.id)


  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });
        const response = await clienteAxios.get("api/v1/rutas/ciudades/1", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCity(await response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });

        if (idCiudad != 0) {
          const response = await clienteAxios.get(
            `/api/v1/rutas/barrios/${idCiudad}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNeighborhood(await response.data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [idCiudad]);


  const [empleado, setEmpleado] = useState({
    primerNombre: worker.persona.primerNombre,
    segundoNombre: worker.persona.segundoNombre,
    primerApellido: worker.persona.primerApellido,
    segundoApellido: worker.persona.segundoApellido,
    identificacion: worker.persona.identificacion,
    telefono: worker.persona.telefono,
    direccion: worker.persona.direccion,
    idBarrio: worker.persona.barrio.id,
    correo: worker.correo
  });

  const [errorValue, setErrorValue] = useState({
    primerNombre:false,
    segundoNombre:false,
    primerApellido:false,
    segundoApellido: false,
    identificacion: false,
    telefono: false,
    idCiudad: false,
    idBarrio: false,
    direccion:false,
    correo: false
  });

  
  const [helperTextValue, sethelperTextValue] = useState({
    primerNombre: "",
    segundoNombre:"",
    primerApellido:"",
    segundoApellido:"",
    identificacion:"",
    telefono:"",
    idCiudad:"",
    idBarrio:"",
    direccion:"",   
    correo: "" 
  });

    const actualizarExistenciaError = () => {
      let errors = {
        primerNombre:false,
        segundoNombre:false,
        primerApellido:false,
        segundoApellido: false,
        identificacion: false,
        telefono: false,
        idCiudad: false,
        idBarrio: false,
        direccion:false,
        correo: false
      }

      let errorText = {
        primerNombre: "",
        segundoNombre:"",
        primerApellido:"",
        segundoApellido:"",
        identificacion:"",
        telefono:"",
        idCiudad: "",
        idBarrio: "",
        direccion:"",   
        correo: ""    
      }

      if (empleado.primerNombre.trim().length === 0) {
        errors = {...errors, primerNombre: true};
        errorText = {...errorText, primerNombre: 'Campo obligatorio'}
      }
      if (empleado.primerApellido.trim().length === 0) {
        errors = {...errors, primerApellido: true};
        errorText = {...errorText, primerApellido: 'Campo obligatorio'}
      }
      if (empleado.segundoApellido.trim().length === 0) {
        errors = {...errors, segundoApellido: true};
        errorText = {...errorText, segundoApellido: 'Campo obligatorio'}
      }
      if (empleado.identificacion.trim().length === 0) {
        errors = {...errors, identificacion: true};
        errorText = {...errorText, identificacion: 'Campo obligatorio'}
      }

      if (empleado.telefono.trim().length === 0) {
        errors = {...errors, telefono: true};
        errorText = {...errorText, telefono: 'Campo obligatorio'}
      }

      if(idCiudad === 0){
        errors = {...errors, idCiudad: true};
        errorText = {...errorText, idCiudad: 'Campo Obligatorio'}
      }

      if(empleado.idBarrio.id === 0){
        errors = {...errors, idBarrio: true};
        errorText = {...errorText, idBarrio : 'Campo Obligatorio'}
      }

      if (empleado.direccion.trim().length === 0) {
        errors = {...errors, direccion: true};
        errorText = {...errorText, direccion: 'Campo obligatorio'}
      }

      if(empleado.correo.trim().length === 0){
        errors = {...errors, correo: true};
        errorText = {...errorText, correo: 'Campo Obligatorio'}
      }
      
      let correoRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!(correoRegex.test(empleado.correo))){
        errors = {...errors, correo: true};
        errorText = {...errorText, correo: 'Formato de correo electrónico incorrecto'}
      }

      setErrorValue(errors);
      sethelperTextValue(errorText);
    };

  

  const onChangeFormulario = (e) => {

    if(e.target.name !== "idCiudad"){
      setEmpleado({
        ...empleado,
        [e.target.name]: e.target.value,
      });
    } else{
      setIdCiudad(e.target.value)
    }
    

    if(e.target.name !== 'idBarrio' && 
       e.target.name != 'idCiudad'){
      if (e.target.value.trim().length === 0) {
        setErrorValue({
          ...errorValue,
          [e.target.name]: true,
        });
  
        sethelperTextValue({
          ...helperTextValue,
          [e.target.name]: "Campo obligatorio",
        });
      } else {
        setErrorValue({
          ...errorValue,
          [e.target.name]: false,
        });
  
        sethelperTextValue({
          ...helperTextValue,
          [e.target.name]: "",
        });
      }
    }
  };

  const submitEditarEmpleado = async (e) => {
    // Se enviaria el cliente al back
    actualizarExistenciaError();

    if (
      !errorValue.primerNombre &&
      !errorValue.segundoNombre &&
      !errorValue.primerApellido &&
      !errorValue.segundoApellido &&
      !errorValue.identificacion &&
      !errorValue.telefono &&
      !errorValue.idCiudad &&
      !errorValue.idBarrio &&
      !errorValue.direccion &&
      !errorValue.correo
    ) {

      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });
        const response = await clienteAxios.put(`/api/v1/trabajadores/trabajador/${worker.id}`,
         empleado, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Mensaje de exito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Empleado Actualizado exitosamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
      } catch (error) {
        const mensaje = error.response.data.mensaje;
  
        // mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al crear empleado",
          text: mensaje,
        });
        console.log(error);
      }
    }
  };

  return (
    <>
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
              <CardHeader title={`Datos Personales ${empleado.primerNombre} ${empleado.primerApellido}`} />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 6, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      error={errorValue.primerNombre}
                      helperText={helperTextValue.primerNombre}
                      label="Primer Nombre"
                      color="success"
                      defaultValue=" "
                      name="primerNombre"
                      value={empleado.primerNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-search"
                      label="Segundo Nombre"
                      color="success"
                      defaultValue=" "
                      name="segundoNombre"
                      value={empleado.segundoNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      error={errorValue.primerNombre}
                      helperText={helperTextValue.primerApellido}
                      label="Primer Apellido"
                      color="success"
                      defaultValue=" "
                      name="primerApellido"
                      value={empleado.primerApellido}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      error={errorValue.segundoApellido}
                      helperText={helperTextValue.segundoApellido}
                      label="Segundo Apellido"
                      color="success"
                      defaultValue=" "
                      name="segundoApellido"
                      value={empleado.segundoApellido}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      error={errorValue.identificacion}
                      helperText={helperTextValue.identificacion}
                      label="Numero Identificación"
                      color="success"
                      type="number"
                      name="identificacion"
                      value={empleado.identificacion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      error={errorValue.telefono}
                      helperText={helperTextValue.telefono}
                      label="Teléfono"
                      color="success"
                      type="number"
                      name="telefono"
                      value={empleado.telefono}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      error={errorValue.direccion}
                      helperText={helperTextValue.direccion}
                      label="Dirección"
                      color="success"
                      name="direccion"
                      value={empleado.direccion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      error={errorValue.correo}
                      helperText={helperTextValue.correo}
                      label="Correo Electrónico"
                      color="success"
                      name="correo"
                      value={empleado.correo}
                      onChange={onChangeFormulario}
                    />
                     <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idCiudad}
                      helperText={helperTextValue.idCiudad} 
                      label="Ciudad"
                      name="idCiudad"
                      value={idCiudad}
                      onChange={onChangeFormulario}
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
                      error={errorValue.idBarrio}
                      helperText={helperTextValue.idBarrio}
                      label="Barrio"
                      name="idBarrio"
                      value={empleado.idBarrio}
                      onChange={onChangeFormulario}
                    >
                      {neighborhood.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={submitEditarEmpleado}
                      >
                        GUARDAR
                      </Button>
                      <Button
                        sx={{ margin: 1,  backgroundColor: theme.palette.error.main}}
                        variant="contained"
                        href="/empleados/gestion_empleados/editar-empleados" 
                      >
                        CANCELAR
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

export default WorkerToEdit;