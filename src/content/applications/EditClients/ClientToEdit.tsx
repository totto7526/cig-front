import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import { useState, useEffect } from "react";

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
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Switch demo" } };

function ClientToEdit({client}) {

  const theme = useTheme();
  let navigate = useNavigate();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [neighborhood, setNeighborhood] = useState([]);
  const [city, setCity] = useState([]);
  const [idCiudad, setIdCiudad] = useState(client.cliente.persona.barrio.zona.ciudad.id);
  const [relationship, setRelationship] = useState([]);


  const callNeighborhood = async (token) => {
    const response = await clienteAxios.get("/api/v1/barrios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNeighborhood(await response.data);
  };

  const callRelationship = async (token) => {
    const response = await clienteAxios.get("/api/v1/parentescos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRelationship(await response.data);
  };

  useEffect(() => {
    (async () => {
      console.log(client);
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
        callRelationship(token);
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

 

  const [cliente, setCliente] = useState({
    identificacion: client.cliente.persona.identificacion,
    primerNombre: client.cliente.persona.primerNombre,
    segundoNombre: client.cliente.persona.segundoNombre,
    primerApellido: client.cliente.persona.primerApellido,
    segundoApellido: client.cliente.persona.segundoApellido,
    direccion: client.cliente.persona.direccion,
    telefono: client.cliente.persona.telefono,
    cupo: client.cliente.cuentaCliente.cupo,
    idBarrio: client.cliente.persona.barrio.id,
    nombreReferencia1: client.referencias[0].nombre,
    telefonoReferencia1: client.referencias[0].telefono,
    idParentescoReferencia1: client.referencias[0].parentesco,
    nombreReferencia2: client.referencias[1].nombre,
    telefonoReferencia2: client.referencias[1].telefono,
    idParentescoReferencia2: client.referencias[1].parentesco,
  });

  const [errorValue, setErrorValue] = useState({
    identificacion: false,
    primerNombre: false,
    segundoNombre: false,
    primerApellido: false,
    segundoApellido: false,
    direccion: false,
    telefono: false,
    cupo: false,
    idCiudad:false,
    idBarrio: false,
    nombreReferencia1: false,
    telefonoReferencia1: false,
    idParentescoReferencia1: false,
    nombreReferencia2: false,
    telefonoReferencia2: false,
    idParentescoReferencia2: false,
  });

  const [helperTextValue, sethelperTextValue] = useState({
    identificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
    telefono: "",
    cupo: "",
    idCiudad: "",
    idBarrio: "",
    nombreReferencia1: "",
    telefonoReferencia1: "",
    idParentescoReferencia1: "",
    nombreReferencia2: "",
    telefonoReferencia2: "",
    idParentescoReferencia2: "",
  });

  const actualizarExistenciaError = () => {
    let errors = {
      identificacion: false,
      primerNombre: false,
      segundoNombre: false,
      primerApellido: false,
      segundoApellido: false,
      direccion: false,
      telefono: false,
      cupo: false,
      idCiudad: false,
      idBarrio:false,
      nombreReferencia1: false,
      telefonoReferencia1: false,
      idParentescoReferencia1: false,
      nombreReferencia2: false,
      telefonoReferencia2: false,
      idParentescoReferencia2: false,
    }

    let errorText = {
      identificacion: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      direccion: "",
      telefono: "",
      cupo: "",
      idCiudad: "",
      idBarrio:"",
      nombreReferencia1: "",
      telefonoReferencia1: "",
      idParentescoReferencia1: "",
      nombreReferencia2: "",
      telefonoReferencia2: "",
      idParentescoReferencia2: "",
    }

    if (cliente.identificacion.trim().length === 0 || cliente.identificacion.trim().length > 10) {
      errors = {...errors, identificacion: true};
      errorText = {...errorText, identificacion: 'Campo obligatorio y longitud debe ser menor a 10'}
    }
    if (cliente.primerNombre.trim().length === 0) {
      errors = {...errors, primerNombre: true};
      errorText = {...errorText, primerNombre: 'Campo obligatorio'}
    }
    if (cliente.primerApellido.trim().length === 0) {
      errors = {...errors, primerApellido: true};
      errorText = {...errorText, primerApellido: 'Campo obligatorio'}
    }
    if (cliente.segundoApellido.trim().length === 0) {
      errors = {...errors, segundoApellido: true};
      errorText = {...errorText, segundoApellido: 'Campo obligatorio'}
    }
    if (cliente.direccion.trim().length === 0) {
      errors = {...errors, direccion: true};
      errorText = {...errorText, direccion: 'Campo obligatorio'}
    }
    if (cliente.telefono.trim().length === 0) {
      errors = {...errors, telefono: true};
      errorText = {...errorText, telefono: 'Campo obligatorio'}
    }
    if (cliente.cupo === 0) {
      errors = {...errors, cupo: true};
      errorText = {...errorText, cupo: 'Campo obligatorio'}
    }

    if (idCiudad == 0 ) {
      errors = {...errors, idCiudad: true};
      errorText = {...errorText, idCiudad: 'Campo obligatorio'}
    }
    if (cliente.idBarrio == 0 || cliente.idBarrio < 0) {
      errors = {...errors, idBarrio: true};
      errorText = {...errorText, idBarrio: 'Campo obligatorio'}
    }
    
    if (cliente.nombreReferencia1.trim().length === 0) {
      errors = {...errors, nombreReferencia1: true};
      errorText = {...errorText, nombreReferencia1: 'Campo obligatorio'}
    }
    if (cliente.telefonoReferencia1.trim().length === 0) {
      errors = {...errors, telefonoReferencia1: true};
      errorText = {...errorText, telefonoReferencia1: 'Campo obligatorio'}
    }

    if (cliente.idParentescoReferencia1 == 0 || cliente.idParentescoReferencia1 < 0){
      errors = {...errors, idParentescoReferencia1: true};
      errorText = {...errorText, idParentescoReferencia1: 'Campo obligatorio'}
    }
    if (cliente.nombreReferencia2.trim().length === 0) {
      errors = {...errors, nombreReferencia2: true};
      errorText = {...errorText, nombreReferencia2: 'Campo obligatorio'}
    }
    if (cliente.telefonoReferencia2.trim().length === 0) {
      errors = {...errors, telefonoReferencia2: true};
      errorText = {...errorText, telefonoReferencia2: 'Campo obligatorio'}
    }
    if (cliente.idParentescoReferencia2 == 0 || cliente.idParentescoReferencia2 < 0){
      errors = {...errors, idParentescoReferencia2: true};
      errorText = {...errorText, idParentescoReferencia2: 'Campo obligatorio'}
    }

    setErrorValue(errors);
    sethelperTextValue(errorText);
  };

  const onChangeFormulario = (e) => {
    if(e.target.name !=='idCiudad'){
      setCliente({
        ...cliente,
        [e.target.name]: e.target.value,
      });
    } else {
      setIdCiudad(e.target.value)
    }
    

   if(e.target.name !== 'idBarrio' &&
      e.target.name !== 'idCiudad' &&
      e.target.name !== 'idParentescoReferencia1' && 
      e.target.name !== 'idParentescoReferencia2'){
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

  const submitCrearCliente = async (e) =>{ 
    // Se enviaria el cliente al back
    actualizarExistenciaError();

    if (
      !errorValue.identificacion  &&
      !errorValue.primerNombre &&
      !errorValue.segundoNombre &&
      !errorValue.primerApellido &&
      !errorValue.segundoApellido &&
      !errorValue.direccion &&
      !errorValue.idCiudad &&
      !errorValue.idBarrio &&
      !errorValue.telefono &&
      !errorValue.cupo &&
      !errorValue.nombreReferencia1 &&
      !errorValue.nombreReferencia2 &&
      !errorValue.telefonoReferencia1 &&
      !errorValue.telefonoReferencia2
    ) {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });
        const response = await clienteAxios.put(`/api/v1/clientes/cliente/${client.cliente.id}`,
         cliente, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Mensaje de exito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente Actualizado exitosamente.",
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
          title: "Error al crear el cliente",
          text: mensaje,
        });
        console.log(error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>RegistroCliente - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro cliente"
          subHeading="Proceso para registrar un cliente nuevo"
          docs="/dashboards/cards"
        />
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
              <CardHeader title="Datos Personales" />
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
                      id="outlined-number"
                      error={errorValue.identificacion}
                      helperText={helperTextValue.identificacion}
                      label="Numero Identificación"
                      color="success"
                      type="number"
                      name="identificacion"
                      value={cliente.identificacion}
                      onChange={onChangeFormulario}
                      InputProps={{ inputProps: { min: 0} }}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Primer nombre"
                      error={errorValue.primerNombre}
                      helperText={helperTextValue.primerNombre}
                      color="success"
                      defaultValue=" "
                      name="primerNombre"
                      value={cliente.primerNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Segundo Nombre"
                      color="success"
                      defaultValue=" "
                      name="segundoNombre"
                      value={cliente.segundoNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Primer Apellido"
                      error={errorValue.primerApellido}
                      helperText={helperTextValue.primerApellido}
                      color="success"
                      defaultValue=" "
                      name="primerApellido"
                      value={cliente.primerApellido}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Segundo Apellido"
                      error={errorValue.segundoApellido}
                      helperText={helperTextValue.segundoApellido}
                      color="success"
                      defaultValue=" "
                      name="segundoApellido"
                      value={cliente.segundoApellido}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Dirección"
                      error={errorValue.direccion}
                      helperText={helperTextValue.direccion}
                      type="text"
                      color="success"
                      name="direccion"
                      value={cliente.direccion}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      error={errorValue.telefono}
                      helperText={helperTextValue.telefono}
                      type="text"
                      color="success"
                      name="telefono"
                      value={cliente.telefono}
                      onChange={onChangeFormulario}
                      InputProps={{ inputProps: { min: 0} }}
                    />

                    <TextField
                      required
                      id="outliend-number"
                      label="Cupo"
                      error={errorValue.cupo}
                      helperText={helperTextValue.cupo}
                      color="success"
                      type= 'number'
                      defaultValue="150000"
                      name="cupo"
                      value={cliente.cupo}
                      onChange={onChangeFormulario}
                      InputProps={{ inputProps: { min: 0} }}
                    />

                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idCiudad}
                      helperText={helperTextValue.idCiudad}
                      label="Ciudad"
                      color="success"
                      value={idCiudad}
                      name="idCiudad"
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
                      color="success"
                      value={cliente.idBarrio}
                      name="idBarrio"
                      onChange={onChangeFormulario}
                    >
                      {neighborhood.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <CardHeader title="Datos referencias" />
                  <Divider />
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre Completo"
                      error={errorValue.nombreReferencia1}
                      helperText={helperTextValue.nombreReferencia1}
                      color="success"
                      name="nombreReferencia1"
                      value={cliente.nombreReferencia1}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-required"
                      label="Telefono"
                      error={errorValue.telefonoReferencia1}
                      helperText={helperTextValue.telefonoReferencia1}
                      type="text"
                      color="success"
                      name="telefonoReferencia1"
                      defaultValue=" "
                      value={cliente.telefonoReferencia1}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idParentescoReferencia1}
                      helperText={helperTextValue.idParentescoReferencia1}
                      label="parentesco"
                      color="success"
                      type="text"
                      name="idParentescoReferencia1"
                      value={cliente.idParentescoReferencia1}
                      onChange={onChangeFormulario}
                    >
                      {relationship.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre Completo"
                      error={errorValue.nombreReferencia2}
                      helperText={helperTextValue.nombreReferencia2}
                      type="text"
                      color="success"
                      defaultValue=" "
                      name="nombreReferencia2"
                      value={cliente.nombreReferencia2}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      error={errorValue.telefonoReferencia2}
                      helperText={helperTextValue.telefonoReferencia2}
                      type="text"
                      color="success"
                      name="telefonoReferencia2"
                      value={cliente.telefonoReferencia2}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idParentescoReferencia2}
                      helperText={helperTextValue.idParentescoReferencia2}
                      label="parentesco"
                      color="success"
                      name="idParentescoReferencia2"
                      value={cliente.idParentescoReferencia2}
                      onChange={onChangeFormulario}
                    >
                      {relationship.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={submitCrearCliente}
                      >
                        GUARDAR
                      </Button>
                      <Button
                        sx={{ margin: 1,  backgroundColor: theme.palette.error.main}}
                        variant="contained"
                        href="/clientes/gestion_clientes/editar-clientes" 
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

export default ClientToEdit;
