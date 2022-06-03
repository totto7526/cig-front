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
import { CryptoWorker, CryptoWorkerStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  CryptoWorkers: CryptoWorker[];
}

interface Filters {
  status?: CryptoWorkerStatus;
}

const getStatusLabel = (CryptoWorkerStatus: CryptoWorkerStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'failed',
      color: 'error'
    },
    completed: {
      text: 'completed',
      color: 'success'
    },
    pending: {
      text: 'pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[CryptoWorkerStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  CryptoWorkers: CryptoWorker[],
  filters: Filters
): CryptoWorker[] => {
  return CryptoWorkers.filter((CryptoWorker) => {
    let matches = true;

    if (filters.status && CryptoWorker.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  CryptoWorkers: CryptoWorker[],
  page: number,
  limit: number
): CryptoWorker[] => {
  return CryptoWorkers.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ CryptoWorkers }) => {

  const [selectedCryptoWorkers, setSelectedCryptoWorkers] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoWorkers.length > 0;
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
      name: 'completed'
    },
    {
      id: 'failed',
      name: 'failed'
    },
    {
      id: 'pending',
      name: 'Pendings'
    }
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

  const handleSelectAllCryptoWorkers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoWorkers(
      event.target.checked
        ? CryptoWorkers.map((CryptoWorker) => CryptoWorker.id)
        : []
    );
  };

  const handleSelectOneCryptoWorker = (
    event: ChangeEvent<HTMLInputElement>,
    CryptoWorkerId: string
  ): void => {
    if (!selectedCryptoWorkers.includes(CryptoWorkerId)) {
      setSelectedCryptoWorkers((prevSelected) => [
        ...prevSelected,
        CryptoWorkerId
      ]);
    } else {
      setSelectedCryptoWorkers((prevSelected) =>
        prevSelected.filter((id) => id !== CryptoWorkerId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoWorkers = applyFilters(CryptoWorkers, filters);
  const paginatedCryptoWorkers = applyPagination(
    filteredCryptoWorkers,
    page,
    limit
  );
  const selectedSomeCryptoWorkers =
    selectedCryptoWorkers.length > 0 &&
    selectedCryptoWorkers.length < CryptoWorkers.length;
  const selectedAllCryptoWorkers =
    selectedCryptoWorkers.length === CryptoWorkers.length;
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
                  checked={selectedAllCryptoWorkers}
                  indeterminate={selectedSomeCryptoWorkers}
                  onChange={handleSelectAllCryptoWorkers}
                />
              </TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Cedula</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Barrio</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoWorkers.map((CryptoWorker) => {
              const isCryptoWorkerSelected = selectedCryptoWorkers.includes(
                CryptoWorker.id
              );
              return (
                <TableRow
                  hover
                  key={CryptoWorker.id}
                  selected={isCryptoWorkerSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoWorkerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoWorker(event, CryptoWorker.id)
                      }
                      value={isCryptoWorkerSelected}
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
                      {CryptoWorker.firstName +' ' +CryptoWorker.secondName}
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
                      {CryptoWorker.firstLastName + ' ' +CryptoWorker.secondLastName}
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
                      {CryptoWorker.idNumber}
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
                      {CryptoWorker.phoneNumber}
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
                      {CryptoWorker.direction}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {CryptoWorker.neighborhood}
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
                      {CryptoWorker.direction}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(CryptoWorker.status)}
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
          count={filteredCryptoWorkers.length}
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
  CryptoWorkers: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  CryptoWorkers: []
};

export default RecentOrdersTable;
