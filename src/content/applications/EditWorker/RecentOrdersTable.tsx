import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
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
  CardHeader,
} from "@mui/material";

import Label from "src/components/Label";
import { Worker, WorkerStatus } from "src/models/worker";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BulkActions from "./BulkActions";
import { useAuth0 } from "@auth0/auth0-react";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import WorkerToEdit from "./WorkerToEdit";

interface RecentOrdersTableProps {
  className?: string;
  Workers: Worker[];
}

interface Filters {
  status?: WorkerStatus;
}

const getStatusLabel = (WorkerStatus: WorkerStatus): JSX.Element => {
  const map = {
    activo: {
      id: 1,
      text: "ACTIVO",
      color: "succes",
    },
    inactivo: {
      id: 2,
      text: "INACTIVO",
      color: "danger",
    },
  };

  const { text, color }: any = map[WorkerStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
    Workers: Worker[],
    filters: Filters
  ): Worker[] => {
  return Workers.filter((Worker) => {
    let matches = true;

    if (filters.status && Worker.estado.nombre !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Workers: Worker[],
  page: number,
  limit: number
): Worker[] => {
  return Workers.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ Workers }) => {
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);
  const selectedBulkActions = selectedWorkers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "completed",
      name: "ACTIVO",
    },
    {
      id: "failed",
      name: "INACTIVO",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllWorkers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedWorkers(
      event.target.checked ? Workers.map((Worker) => Worker.id) : []
    );
  };

  const handleSelectOneWorker = (
    event: ChangeEvent<HTMLInputElement>,
    WorkerId: number
  ): void => {
    if (!selectedWorkers.includes(WorkerId)) {
      setSelectedWorkers((prevSelected) => [
        ...prevSelected, WorkerId]);
    } else {
      setSelectedWorkers((prevSelected) =>
        prevSelected.filter((id) => id !== WorkerId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredWorkers = applyFilters(Workers, filters);
  const paginatedWorkers = applyPagination(
    filteredWorkers, 
    page, 
    limit
  );
  const selectedSomeWorkers =
    selectedWorkers.length > 0 && selectedWorkers.length < Workers.length;
  const selectedAllWorkers = selectedWorkers.length === Workers.length;
  const theme = useTheme();

  const { getAccessTokenSilently } = useAuth0();

  const [workerEdit, setWorkerEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const cambiarEstado = async (idTrabajador, nombre, estado) => {
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
        console.log("CambiarEstado" + idTrabajador);

        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });
        console.log(token);

        const response = await clienteAxios.put(
          `/api/v1/trabajadores/trabajador/${idTrabajador}/cambiar-estado`,
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

  const goToWorkerToEdit = (worker) => {
      console.log(worker);
      setWorkerEdit(worker),
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
                  value={filters.status || "all"}
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
          title="Empleados"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Cedula</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkers.map((Worker) => {
              const isWorkerSelected = selectedWorkers.includes(
                Worker.id
              );
              return (
                <TableRow 
                  hover 
                  key={Worker.id} 
                  selected={isWorkerSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Worker.persona.primerNombre +
                        " " +
                        Worker.persona.segundoNombre}
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
                      {Worker.persona.primerApellido +
                        " " +
                        Worker.persona.segundoApellido}
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
                      {Worker.persona.identificacion}
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
                      {Worker.persona.telefono}
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
                      {Worker.correo}
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
                      {Worker.persona.direccion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Worker.persona.barrio.nombre}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {/* {getStatusLabel(Worker)} */}
                    {Worker.estado.nombre === "ACTIVO" ? (
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
                    <Tooltip title="Editar" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => goToWorkerToEdit(Worker)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cambiar Estado" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() =>
                          cambiarEstado(
                            Worker.id,
                            Worker.persona.primerNombre,
                            Worker.estado.nombre
                          )
                        }
                      >
                        <ToggleOnIcon fontSize="small" />
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
          count={filteredWorkers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    :
    <WorkerToEdit worker = {workerEdit}/>
  );
};

RecentOrdersTable.propTypes = {
  Workers: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  Workers: [],
};

export default RecentOrdersTable;
