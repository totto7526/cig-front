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
} from "@mui/material";
import Footer from "src/components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import clienteAxios from "src/config/axios";

import Swal from "sweetalert2";

import { useAuth0 } from "@auth0/auth0-react";

const label = { inputProps: { "aria-label": "Switch demo" } };

function WorkerAdd() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [neighborhood, setNeighborhood] = useState([]);

  const callNeighborhood = async (token) => {
    const response = await clienteAxios.get('/api/v1/barrios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setNeighborhood(await response.data);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });

        callNeighborhood(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const [empleado, setEmpleado] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    identificacion: "",
    telefono: "",
    direccion: "",
    idBarrio: 0,
  });

  const onChangeFormulario = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  const submitCrearEmpleado = async (e) => {
    // Se enviaria el cliente al back
    try {
      const token = await getAccessTokenSilently({
        audience: "htttps://cig/api",
        scope: "read:cig-vendedor read:cig-cobrador",
      });
      const response = await clienteAxios.post('/api/v1/trabajadores/trabajador', empleado, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Mensaje de exito
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Empleado registrado exitosamente.",
        showConfirmButton: false,
        timer: 1500,
      });
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
  };

  return (
    <>
      <Helmet>
        <title>RegistroEmpleado - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro Empleado"
          subHeading="Proceso para registrar un empleado nuevo"
          docs="/overview"
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
                      required
                      id="outlined-required"
                      label="Primer Nombre"
                      color="success"
                      defaultValue=" "
                      name="primerNombre"
                      value={empleado.primerNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
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
                      label="Segundo Apellido"
                      color="success"
                      defaultValue=" "
                      name="segundoApellido"
                      value={empleado.segundoApellido}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      label="Numero Identificación"
                      color="success"
                      type="number"
                      name="identificacion"
                      value={empleado.identificacion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      color="success"
                      type="number"
                      name="telefono"
                      value={empleado.telefono}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Dirección"
                      color="success"
                      name="direccion"
                      value={empleado.direccion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select"
                      select
                      label="Barrio"
                      name="idBarrio"
                      value={empleado.idBarrio}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un barrio"
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
                        onClick={submitCrearEmpleado}
                      >
                        GUARDAR
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

export default WorkerAdd;
