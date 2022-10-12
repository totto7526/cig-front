import { Card } from '@mui/material';
import { Product } from 'src/models/product';
import RecentOrdersTable from './RecentOrdersTable';
import clienteAxios from  'src/config/axios';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';

function RecentProductsOrders() {

  const [products, setProducts] = useState()
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'htttps://cig/api',
          scope: 'read:cig-vendedor read:cig-cobrador',
        });
        const response = await clienteAxios.get('/api/v1/productos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, products])

  return (
    <Card>
      <RecentOrdersTable Products={products} />
    </Card>
  );
}

export default RecentProductsOrders;
