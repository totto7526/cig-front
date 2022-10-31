import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import { useEffect, useState } from "react";

import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  InputAdornment,
} from "@mui/material";
import Footer from "src/components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Collections } from "@mui/icons-material";
import clienteAxios from "src/config/axios";
import { useAuth0 } from "@auth0/auth0-react";
import StatusMaintenance from "../../Status/Maintenance/index";
import Swal from "sweetalert2";
import { DatePicker } from "@mui/lab";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Liquidateroute() {
  const [listEmpleados, setListEmpleados] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });

        const response = await clienteAxios.get(`/api/v1/trabajadores`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListaEmpleados(await response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  const [liquidacionValues, setLiquidacionValues] = useState({
    idTrabajador: 0,
    fechaRealizacion: "",
    crearLiquidacion: false,
  });

  const [liquidate, setLiquidate] = useState({
    liquidacion: null,
    totalCobrosIniciales: 0,
    totalCobrosNormales: 0,
    totalVentas: 0,
    totalEfectivo: 0,
  });

  useEffect(() => {
    (async () => {
      
      if (liquidacionValues.idTrabajador !== 0) {
        try {
          const token = await getAccessTokenSilently({
            audience: "htttps://cig/api",
            scope: "read:cig-admin",
          });
          const response = await clienteAxios.post(
            `/api/v1/liquidaciones/calcular-valores`,
            liquidacionValues,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLiquidate(response.data);
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [liquidacionValues.idTrabajador, liquidacionValues.fechaRealizacion]);

  const onChangeFormulario = (e) => {
    if (e.target.name === "idTrabajador") {
      setLiquidacionValues({
        ...liquidacionValues,
        idTrabajador: e.target.value,
      });
    } else {
      setLiquidate({
        ...liquidate,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitLiquidateRoute = (e) => {
    // Se enviaria el cliente al back
    console.log(liquidate);

    // aqui estaria la respuesta del back
    console.log("Se ha liquidado exitosamente");
  };

  function createData(
    name: string,
    collection: number,
    initials: number,
    sales: number,
    cash: number,
    must: number
  ) {
    return { name, collection, initials, sales, cash, must };
  }

  const liquidar = async () => {
    if (liquidacionValues.idTrabajador === 0) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar liquidar",
        text: "Debe seleccionar un empleado para continuar",
      });
    } else if (
      liquidate.totalCobrosIniciales === 0 &&
      liquidate.totalCobrosNormales === 0 &&
      liquidate.totalVentas === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar liquidar",
        text: "El empleado no presenta valores para realizar liquidación",
      });
    } else {
      let body = {
        idTrabajador: liquidacionValues.idTrabajador,
        fechaRealizacion: liquidacionValues.fechaRealizacion,
        crearLiquidacion: true,
      };

      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });
        const response = await clienteAxios.post(
          "/api/v1/liquidaciones/calcular-valores",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Mensaje de exito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente registrado exitosamente.",
          showConfirmButton: false,
          timer: 1500,
        });
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
        <title>LiquidarRuta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="liquidar ruta"
          subHeading="Proceso para liquidar una ruta"
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
              <CardHeader title="Datos Producido" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      mr: 10,
                      mb: 5,
                      ml: 5,
                      mt: 5,
                      width: "25ch",
                    },
                  }}
                  noValidate
                  autoComplete="off"
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
                      defaultValue=" "
                      name="idTrabajador"
                      value={liquidacionValues.idTrabajador}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un empleado"
                    >
                      {listaEmpleados.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.persona.primerNombre +
                            " " +
                            option.persona.primerApellido}
                        </MenuItem>
                      ))}
                    </TextField>
                    <DatePicker
                      label="Fecha Liquidacion"
                      value={liquidacionValues.fechaRealizacion}
                      onChange={(newValue) => {
                        setLiquidacionValues({...liquidacionValues, fechaRealizacion: newValue});
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField
                      label="Total Cobrado"
                      id="filled-start-adornment"
                      color="success"
                      name="totalCollection"
                      value={liquidate.totalCobrosNormales}
                      onChange={onChangeFormulario}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      label="Total Iniciales"
                      id="filled-start-adornment"
                      color="success"
                      name="totalInitial"
                      value={liquidate.totalCobrosIniciales}
                      onChange={onChangeFormulario}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      label="Total Ventas"
                      id="filled-start-adornment"
                      color="success"
                      name="totalSelling"
                      value={liquidate.totalVentas}
                      onChange={onChangeFormulario}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      label="Total en Efectivo"
                      id="filled-start-adornment"
                      color="success"
                      name="totalCash"
                      type="number"
                      value={liquidate.totalEfectivo}
                      onChange={onChangeFormulario}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />
                    <div>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={() => liquidar()}
                      >
                        Liquidar
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

export default Liquidateroute;
