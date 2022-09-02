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
      status: 'completed',
      reference: 'GHM 5403',
      Description: 'cortinas en argollas',
      lengthProduct: 1.50,
      widthProduct: 2.30,
      units: 'CM',
    },
    {
      id: '2',
      amount: 3,
      nameProduct: 'Sanadas Dobles',
      status: 'completed',
      reference: 'Lunatex',
      Description: 'Microfibra y algodon',
      lengthProduct: 1.40,
      widthProduct: 1.90,
      units: 'CM',
    },
    {
      id: '3',
      amount: 1,
      nameProduct: 'Tohallones',
      status: 'failed',
      reference: 'Casita',
      Description: '93% algodon',
      lengthProduct: 70,
      widthProduct: 40,
      units: 'CM',
    },
    {
      id: '4',
      amount: 5,
      nameProduct: 'Forros Lavadora',
      status: 'completed',
      reference: 'Lunatex',
      Description: 'multiples colores y units',
      lengthProduct: 31,
      widthProduct: 33,
      units: 'Libras',
    },
    {
      id: '5',
      amount: 2,
      nameProduct: 'Unifaz Doble',
      status: 'pending',
      reference: 'Microfibra',
      Description: 'Tendido de tres piezas',
      lengthProduct: 1.40,
      widthProduct: 1.90,
      units: 'CM',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable Dispatchs={Dispatchs} />
    </Card>
  );
}

export default RecentDispatchsOrders;
