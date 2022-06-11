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
import { CryptoClient, CryptoClientStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  CryptoClients: CryptoClient[];
}

interface Filters {
  status?: CryptoClientStatus;
}

const getStatusLabel = (CryptoClientStatus: CryptoClientStatus): JSX.Element => {
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

  const { text, color }: any = map[CryptoClientStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  CryptoClients: CryptoClient[],
  filters: Filters
): CryptoClient[] => {
  return CryptoClients.filter((CryptoClient) => {
    let matches = true;

    if (filters.status && CryptoClient.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  CryptoClients: CryptoClient[],
  page: number,
  limit: number
): CryptoClient[] => {
  return CryptoClients.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ CryptoClients }) => {

  const [selectedCryptoClients, setSelectedCryptoClients] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoClients.length > 0;
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

  const handleSelectAllCryptoClients = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoClients(
      event.target.checked
        ? CryptoClients.map((CryptoClient) => CryptoClient.id)
        : []
    );
  };

  const handleSelectOneCryptoClient = (
    event: ChangeEvent<HTMLInputElement>,
    CryptoClientId: string
  ): void => {
    if (!selectedCryptoClients.includes(CryptoClientId)) {
      setSelectedCryptoClients((prevSelected) => [
        ...prevSelected,
        CryptoClientId
      ]);
    } else {
      setSelectedCryptoClients((prevSelected) =>
        prevSelected.filter((id) => id !== CryptoClientId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoClients = applyFilters(CryptoClients, filters);
  const paginatedCryptoClients = applyPagination(
    filteredCryptoClients,
    page,
    limit
  );
  const selectedSomeCryptoClients =
    selectedCryptoClients.length > 0 &&
    selectedCryptoClients.length < CryptoClients.length;
  const selectedAllCryptoClients =
    selectedCryptoClients.length === CryptoClients.length;
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
                  checked={selectedAllCryptoClients}
                  indeterminate={selectedSomeCryptoClients}
                  onChange={handleSelectAllCryptoClients}
                />
              </TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Cedula</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Cupo</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoClients.map((CryptoClient) => {
              const isCryptoClientSelected = selectedCryptoClients.includes(
                CryptoClient.id
              );
              return (
                <TableRow
                  hover
                  key={CryptoClient.id}
                  selected={isCryptoClientSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoClientSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoClient(event, CryptoClient.id)
                      }
                      value={isCryptoClientSelected}
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
                      {CryptoClient.firstName +' ' +CryptoClient.secondName}
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
                      {CryptoClient.firstLastName + ' ' +CryptoClient.secondLastName}
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
                      {CryptoClient.idNumber}
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
                      {CryptoClient.phoneNumber}
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
                      {CryptoClient.cityName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {CryptoClient.neighborhood}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">

                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(CryptoClient.quota).format(
                        `${CryptoClient.currency}0,0.00`
                      )}
                    </Typography>

                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(CryptoClient.status)}
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
          count={filteredCryptoClients.length}
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
  CryptoClients: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  CryptoClients: []
};

export default RecentOrdersTable;
