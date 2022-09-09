import { Card } from '@mui/material';
import { Product } from 'src/models/product';
import RecentOrdersTable from './RecentOrdersTable';
import clienteAxios from  'src/config/axios';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';

function RecentProductsOrders() {

  const [products, setProducts] = useState()

  const callProducts = async() => {
    const response = await clienteAxios.get('/api/v1/productos')
    console.log(response.data)
    setProducts(response.data)
  }
  useEffect(() => {
      callProducts();
  }, [])

  return (
    <Card>
      <RecentOrdersTable Products={products} />
    </Card>
  );
}

export default RecentProductsOrders;
