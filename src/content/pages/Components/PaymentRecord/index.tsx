import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";

import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Tooltip,
  IconButton,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from "@mui/material";
import Footer from "src/components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl, { formControlClasses } from "@mui/material/FormControl";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";

import Switch from "@mui/material/Switch";

import { useAuth0 } from "@auth0/auth0-react";
import { saleResponse } from "../../../../models/saleResponse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const label = { inputProps: { "aria-label": "Switch demo" } };

const listSales = [
  {
    value: 1,
    label: "Venta 1",
  },
  {
    value: 2,
    label: "Venta 2",
  },
  {
    value: 3,
    label: "Venta 3",
  },
  {
    value: 4,
    label: "Venta 4",
  },
];

function PaymentRecord() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [listVentas, setListVentas] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const callVentas = async (idCliente) => {
    const response = await clienteAxios.get(
      `/api/v1/ventas/cliente/${idCliente}`
    );
    setListVentas(response.data);
  };

  useEffect(() => {
    //callVentas();
  }, []);

  const [identificacion, setIdentificacion] = useState("");
  const [ventas, setVentas] = useState([]);
  const [planCuotas, setPlanCuotas] = useState([]);
  const [idCliente, setIdCliente] = useState(0);

  const [paymentRecord, setPaymentRecord] = useState({
    idTrabajador: 0,
    idCliente: 0,
    idVenta: 0,
    paymentCost: "",
  });

  const [paymoneyOrshare, setPaymoneyOrshare] = useState(true);

  const onChangeFormulario = (e) => {
    setPaymentRecord({
      ...paymentRecord,
      [e.target.name]: e.target.value,
    });
  };

  const onChangepaymoneyOrshare = (e) => {
    setPaymoneyOrshare(!paymoneyOrshare);
  };

  const submitCrearProducto = async (e) => {
    const response = await clienteAxios.get("/api/v1/idClientes/idCliente", {
      params: { identificacion: identificacion },
    });
    paymentRecord.idCliente = response.data.id;
  };

  const consultarVentasClientes = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: "htttps://cig/api",
        scope: "read:cig-vendedor read:cig-cobrador",
      });

      const responseCliente = await clienteAxios.get(
        "/api/v1/clientes/cliente",
        {
          params: { identificacion: identificacion },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIdCliente(responseCliente.data.id);

      const responseVentas = await clienteAxios.get(
        `/api/v1/ventas/cliente/${responseCliente.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVentas(responseVentas.data);
    } catch (error) {
      console.log(error);

      const mensaje = error.response.data.mensaje;

      // mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error al consultar los datos del cliente",
        text: mensaje,
      });
      console.log(error);
    }
  };

  const llenarPlan = async (idSale, estado) => {
    try {
      const token = await getAccessTokenSilently({
        audience: "htttps://cig/api",
        scope: "read:cig-vendedor read:cig-cobrador",
      });

      const response = await clienteAxios.get(
        `/api/v1/cuotas/venta/${idSale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlanCuotas(response.data);
      let proximaCuota = planCuotas.find((x) => x.resta !== 0);

      if (estado === "CANCELADA")
        Swal.fire("NO TIENE CUOTAS PENDIENTES PARA ESTA VENTA");
      else
        Swal.fire(
          "Proxima cuota",
          `fecha limite de pago: ${proximaCuota.fechaPropuesta}, valor: ${proximaCuota.resta}`,
          "info"
        );
    } catch (error) {
      const mensaje = error.response.data.mensaje;

      // mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error al consultar los datos del cliente",
        text: mensaje,
      });
      console.log(error);
    }
  };

  const realizarGestion = async (idSale) => {
    try {
      const token = await getAccessTokenSilently({
        audience: "htttps://cig/api",
        scope: "read:cig-vendedor read:cig-cobrador",
      });

      const responseTrabajador = await clienteAxios.get(
        `/api/v1/trabajadores/trabajador/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Que deseas realizar con la venta",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Realizar Abono",
        denyButtonText: `Pagar proxima cuota`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title: "Ingresa el valor a abonar",
            input: "number",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
          }).then(async (result) => {
            if (result.isConfirmed) {
              await clienteAxios.post(
                `/api/v1/cuotas/abono-cuenta`,
                {
                  idTrabajador: responseTrabajador.data.id,
                  idCliente: idCliente,
                  idVenta: idSale,
                  valorAbono: result.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Abono registrado Exitosamente",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } else if (result.isDenied) {
          await clienteAxios.post(
            `/api/v1/cuotas/pago-cuota`,
            {
              idTrabajador: responseTrabajador.data.id,
              idCliente: idCliente,
              idVenta: idSale,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cuota pagada exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      const mensaje = error.response.data.mensaje;

      // mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error al consultar los datos del cliente",
        text: mensaje,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro Abono - Registro Pago Cuota</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Registro Abono"
          subHeading="Proceso para registrar el pago cuota o abono de un Cliente"
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
              <CardHeader title="Realice el pago del Cliente" />
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
                      id="outlined-select"
                      required
                      label="Número Cédula Cliente"
                      name="identificacion"
                      color="success"
                      value={identificacion}
                      onChange={(e) => setIdentificacion(e.target.value)}
                      helperText="Por favor ingrese el numero de cedula del Cliente"
                    />

                    <Button
                      sx={{ margin: 8 }}
                      variant="contained"
                      onClick={() => consultarVentasClientes()}
                    >
                      Consultar
                    </Button>
                  </div>
                  <Divider />
                  {ventas.length !== 0 ? (
                    <>
                      <CardHeader
                        action={<Box width={150}></Box>}
                        title="Ventas Registradas"
                      />
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Fecha Realización</TableCell>
                              <TableCell>Valor</TableCell>
                              <TableCell>Forma de Pago</TableCell>
                              <TableCell>Modalidad</TableCell>
                              <TableCell>Estado Venta</TableCell>
                              <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {ventas.map((sale) => {
                              return (
                                <TableRow hover key={sale.id}>
                                  <TableCell>
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      color="text.primary"
                                      gutterBottom
                                      noWrap
                                    >
                                      {new Date(sale.fecha).toLocaleString()}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      color="text.primary"
                                      gutterBottom
                                      noWrap
                                    >
                                      {sale.valorTotal}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      color="text.primary"
                                      gutterBottom
                                      noWrap
                                    >
                                      {sale.formaPago.nombre}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      color="text.primary"
                                      gutterBottom
                                      noWrap
                                    >
                                      {sale.modalidad.nombre}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      color="text.primary"
                                      gutterBottom
                                      noWrap
                                    >
                                      {sale.estadoVenta.nombre}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Tooltip title="Ver plan de pagos" arrow>
                                      <IconButton
                                        sx={{
                                          "&:hover": {
                                            background:
                                              theme.colors.error.lighter,
                                          },
                                          color: theme.palette.primary.main,
                                        }}
                                        color="inherit"
                                        size="small"
                                        onClick={() =>
                                          llenarPlan(
                                            sale.id,
                                            sale.estadoVenta.nombre
                                          )
                                        }
                                      >
                                        <VisibilityIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Tooltip title="Gestionar" arrow>
                                      <IconButton
                                        sx={{
                                          "&:hover": {
                                            background:
                                              theme.colors.error.lighter,
                                          },
                                          color: theme.palette.primary.main,
                                        }}
                                        color="inherit"
                                        size="small"
                                        onClick={() => realizarGestion(sale.id)}
                                      >
                                        <AttachMoneyIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/*<div>
                        <FormControlLabel
                          control={
                            // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                            <Switch
                              checked={paymoneyOrshare}
                              onChange={onChangepaymoneyOrshare}
                              name="check"
                            />
                          }
                          label="Abono"
                        />
                        </div>*/}
                      {/*!paymoneyOrshare ? (
                        <>
                          <div>
                            <Button
                              sx={{ margin: 5 }}
                              variant="contained"
                              onClick={submitCrearProducto}
                            >
                              Pagar Proxima Cuota
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <FormControl component="fieldset" sx={{ margin: 5 }}>
                            <InputLabel htmlFor="standard-adornment-amount">
                              Valor Abono
                            </InputLabel>
                            <Input
                              required
                              id="cantidad"
                              color="success"
                              type="number"
                              name="paymentCost"
                              value={paymentRecord.paymentCost}
                              onChange={onChangeFormulario}
                              startAdornment={
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              }
                            />
                          </FormControl>

                          <div>
                            <Button
                              sx={{ margin: 5 }}
                              variant="contained"
                              onClick={submitCrearProducto}
                            >
                              Registrar Abono
                            </Button>
                          </div>
                        </div>
                            )*/}
                    </>
                  ) : (
                    <div></div>
                  )}
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
