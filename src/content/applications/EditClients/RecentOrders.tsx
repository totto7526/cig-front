import { Card } from '@mui/material';
import { Client} from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import clienteAxios from  'src/config/axios';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';

function RecentClientsOrders() {

  const [clients, setClients] = useState()

  const callClients = async() => {
    const response = await clienteAxios.get('/api/v1/clientes/con-referencias')
    setClients(response.data)
  }
  useEffect(() => {
      callClients();
  }, [])


  return (
    <Card>
      <RecentOrdersTable Clients={clients} />
    </Card>
  );
}

export default RecentClientsOrders;
