import { Card } from '@mui/material';
import {Dispatch} from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentDispatchsOrders() {

  const Dispatchs: Dispatch[] = [
    {
      id: '1',
      amount: 2,
      nameProduct: 'Cortinas Giraltex',
      status: 'ACTIVO',
      reference: 'GHM 5403',
      Description: 'cortinas en argollas',
      lengthProduct: 1.50,
      widthProduct: 2.30,
      units: 'CM',
    },
  ];

  return (
    <Card>
      <RecentOrdersTable Dispatchs={Dispatchs} />
    </Card>
  );
}

export default RecentDispatchsOrders;
