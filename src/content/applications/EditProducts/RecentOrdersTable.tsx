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
import { CryptoProduct, CryptoProductStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  CryptoProducts: CryptoProduct[];
}

interface Filters {
  status?: CryptoProductStatus;
}

const getStatusLabel = (CryptoProductStatus: CryptoProductStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'disponible',
      color: 'success'
    },
    completed: {
      text: 'agotado',
      color: 'error'
    },
    pending: {
      text: 'pedido',
      color: 'warning'
    }
  };

  const { text, color }: any = map[CryptoProductStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  CryptoProducts: CryptoProduct[],
  filters: Filters
): CryptoProduct[] => {
  return CryptoProducts.filter((CryptoProduct) => {
    let matches = true;

    if (filters.status && CryptoProduct.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  CryptoProducts: CryptoProduct[],
  page: number,
  limit: number
): CryptoProduct[] => {
  return CryptoProducts.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ CryptoProducts }) => {

  const [selectedCryptoProducts, setSelectedCryptoProducts] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoProducts.length > 0;
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
      id: 'disponible',
      name: 'Disponible'
    },
    {
      id: 'agotado',
      name: 'Agotado'
    },
    {
      id: 'pedido',
      name: 'Pedido'
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

  const handleSelectAllCryptoProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoProducts(
      event.target.checked
        ? CryptoProducts.map((CryptoProduct) => CryptoProduct.id)
        : []
    );
  };

  const handleSelectOneCryptoProduct = (
    event: ChangeEvent<HTMLInputElement>,
    CryptoProductId: string
  ): void => {
    if (!selectedCryptoProducts.includes(CryptoProductId)) {
      setSelectedCryptoProducts((prevSelected) => [
        ...prevSelected,
        CryptoProductId
      ]);
    } else {
      setSelectedCryptoProducts((prevSelected) =>
        prevSelected.filter((id) => id !== CryptoProductId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoProducts = applyFilters(CryptoProducts, filters);
  const paginatedCryptoProducts = applyPagination(
    filteredCryptoProducts,
    page,
    limit
  );
  const selectedSomeCryptoProducts =
    selectedCryptoProducts.length > 0 &&
    selectedCryptoProducts.length < CryptoProducts.length;
  const selectedAllCryptoProducts =
    selectedCryptoProducts.length === CryptoProducts.length;
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
                  checked={selectedAllCryptoProducts}
                  indeterminate={selectedSomeCryptoProducts}
                  onChange={handleSelectAllCryptoProducts}
                />
              </TableCell>
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Referencia Producto</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell align="right">Medidas</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoProducts.map((CryptoProduct) => {
              const isCryptoProductSelected = selectedCryptoProducts.includes(
                CryptoProduct.id
              );
              return (
                <TableRow
                  hover
                  key={CryptoProduct.id}
                  selected={isCryptoProductSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoProductSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoProduct(event, CryptoProduct.id)
                      }
                      value={isCryptoProductSelected}
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
                      {CryptoProduct.nameProduct}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(CryptoProduct.orderDate, 'MMMM dd yyyy')}
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
                      {CryptoProduct.orderID}
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
                      {CryptoProduct.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {CryptoProduct.sourceDesc}
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
                      {CryptoProduct.amountCrypto}
                      {CryptoProduct.medidas}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(CryptoProduct.amount).format(
                        `${CryptoProduct.currency}0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(CryptoProduct.status)}
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
          count={filteredCryptoProducts.length}
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
  CryptoProducts: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  CryptoProducts: []
};

export default RecentOrdersTable;
