import { Card } from '@mui/material';
import { CryptoProduct } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentProductsOrders() {

  const CryptoProducts: CryptoProduct[] = [
    {
      id: '1',
      nameProduct: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'disponible',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 34.4565,
      amount: 56787,
      medidas: 'cm',
      currency: '$'
    },
    {
      id: '2',
      nameProduct: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'disponible',
      orderID: '23M3UOG65G8K',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      medidas: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      nameProduct: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'agotado',
      orderID: 'F6JHK65MS818',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      medidas: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      nameProduct: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'disponible',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      medidas: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      nameProduct: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pedido',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      medidas: 'BTC',
      currency: '$'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable CryptoProducts={CryptoProducts} />
    </Card>
  );
}

export default RecentProductsOrders;
