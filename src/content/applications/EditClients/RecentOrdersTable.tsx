import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { Client, ClientStatus } from 'src/models/client';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { useAuth0 } from "@auth0/auth0-react";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import ClientToEdit from "./ClientToEdit";

interface RecentOrdersTableProps {
  className?: string;
  Clients: Client[];
}

interface Filters {
  status?: ClientStatus;
}

const getStatusLabel = (ClientStatus: ClientStatus): JSX.Element => {
  const map = {
    activo: {
      id: 1,
      text: 'ACTIVO',
      color: 'succes'
    },
    inactivo: {
      id: 2,
      text: 'INACTIVO',
      color: 'danger'
    },
  };

  const { text, color }: any = map[ClientStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  Clients: Client[],
  filters: Filters
): Client[] => {
  return Clients.filter((Client) => {
    let matches = true;

    if (filters.status && Client.cliente.estado.nombre !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Clients: Client[],
  page: number,
  limit: number
): Client[] => {
  return Clients.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ Clients }) => {

  const [selectedClients, setSelectedClients] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedClients.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'ACTIVO'
    },
    {
      id: 'failed',
      name: 'INACTIVO'
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllClients = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedClients(
      event.target.checked
        ? Clients.map((Client) => Client.cliente.id)
        : []
    );
  };

  const handleSelectOneClient = (
    event: ChangeEvent<HTMLInputElement>,
    ClientId: number
  ): void => {
    if (!selectedClients.includes(ClientId)) {
      setSelectedClients((prevSelected) => [
        ...prevSelected,
        ClientId
      ]);
    } else {
      setSelectedClients((prevSelected) =>
        prevSelected.filter((id) => id !== ClientId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredClients = applyFilters(Clients, filters);
  const paginatedClients = applyPagination(
    filteredClients,
    page,
    limit
  );
  const selectedSomeClients =
    selectedClients.length > 0 &&
    selectedClients.length < Clients.length;
  const selectedAllClients =
    selectedClients.length === Clients.length;
  const theme = useTheme();

  const { getAccessTokenSilently } = useAuth0();

  const [clientEdit, setClientEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const cambiarEstado = async (idCliente, nombre, estado) => {
    let nuevoEstado = estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Deseas cambiar el estado de ${nombre} a ${nuevoEstado}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("CambiarEstado" + idCliente);

        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });
        console.log(token);

        const response = await clienteAxios.put(
          `/api/v1/clientes/cliente/${idCliente}/cambiar-estado`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          title: "Cambiando estado",
          html: "Espera un momento.",
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then((result) => {
          
        });
      }
    });
  };

    const goToClientToEdit = (client) => {
      console.log(clientEdit);
      setClientEdit(client),
      setIsEdit(true);
  }

  return (
    !isEdit ?
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Clientes"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cedula</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Cupo</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell align='center'>Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClients.map((Client) => {
              const isClientSelected = selectedClients.includes(
                Client.cliente.id
              );
              return (
                <TableRow
                  hover
                  key={Client.cliente.id}
                  selected={isClientSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Client.cliente.persona.identificacion}
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
                      {Client.cliente.persona.primerNombre +' ' +Client.cliente.persona.segundoNombre}
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
                      {Client.cliente.persona.primerApellido + ' ' +Client.cliente.persona.segundoApellido}
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
                      {Client.cliente.persona.direccion}
                    </Typography>
                    <Typography 
                        variant="body2"
                        color="text.secondary"
                        noWrap
                    >
                      {Client.cliente.persona.barrio.nombre}
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
                      {Client.cliente.persona.telefono}
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
                      {Client.cliente.cuentaCliente.cupo}
                    </Typography>
                  </TableCell>   
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Client.referencias[0].nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Client.referencias[0].telefono}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Client.referencias[0].parentesco}
                    </Typography>
                  </TableCell>   

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Client.referencias[1].nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Client.referencias[1].telefono}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Client.referencias[1].parentesco}
                    </Typography>
                  </TableCell>     

                  <TableCell align="right">
                    {/* {getStatusLabel(Worker)} */}
                    {Client.cliente.estado.nombre === "ACTIVO" ? (
                      <Tooltip title="ACTIVO" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <CheckCircleIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="INACTIVO" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <CancelIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => goToClientToEdit(Client.cliente)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cambiar Estado" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() =>
                          cambiarEstado(
                            Client.cliente.id,
                            Client.cliente.persona.primerNombre,
                            Client.cliente.estado.nombre
                          )
                        }
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredClients.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    :
    <ClientToEdit client = {clientEdit}/>
  );
};

RecentOrdersTable.propTypes = {
  Clients: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Clients: []
};

export default RecentOrdersTable;
