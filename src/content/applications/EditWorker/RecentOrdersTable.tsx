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
import { Worker, WorkerStatus } from 'src/models/worker';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

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
      text: 'ACTIVO',
      color: 'succes'
    },
    inactivo: {
      id: 2,
      text: 'INACTIVO',
      color: 'danger'
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

  const [selectedWorkers, setSelectedWorkers] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedWorkers.length > 0;
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

  const handleSelectAllWorkers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedWorkers(
      event.target.checked
        ? Workers.map((Worker) => Worker.id)
        : []
    );
  };

  const handleSelectOneWorker = (
    event: ChangeEvent<HTMLInputElement>,
    WorkerId: number
  ): void => {
    if (!selectedWorkers.includes(WorkerId)) {
      setSelectedWorkers((prevSelected) => [
        ...prevSelected,
        WorkerId
      ]);
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
    selectedWorkers.length > 0 &&
    selectedWorkers.length < Workers.length;
  const selectedAllWorkers =
    selectedWorkers.length === Workers.length;
  const theme = useTheme();

  return (
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
          title="Productos"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllWorkers}
                  indeterminate={selectedSomeWorkers}
                  onChange={handleSelectAllWorkers}
                />
              </TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Teléfono / Celular</TableCell>
              <TableCell align="right">Dirección</TableCell>
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isWorkerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneWorker(event, Worker.id)
                      }
                      value={isWorkerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Worker.persona.primerNombre +' ' +Worker.persona.segundoNombre}
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
                      {Worker.persona.primerApellido + ' ' +Worker.persona.segundoApellido}
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
                    {Worker.estado.nombre}
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
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
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
          count={filteredWorkers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  Workers: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Workers: []
};

export default RecentOrdersTable;
