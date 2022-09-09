import { Card } from '@mui/material';
import {Worker } from 'src/models/worker';
import RecentOrdersTable from './RecentOrdersTable';
import clienteAxios from  'src/config/axios';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';



function RecentWorkersOrders() {

  const [workers, setWorkers] = useState()

  const callWorker = async() => {
    const response = await clienteAxios.get('/api/v1/trabajadores')
    setWorkers(response.data)
  }
  useEffect(() => {
      callWorker();
  }, [])

  return (
    <Card>
      <RecentOrdersTable Workers={workers} />
    </Card>
  );
}

export default RecentWorkersOrders;
