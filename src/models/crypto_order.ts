export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export type CryptoProductStatus = 'completed' | 'pending' | 'failed';
export type CryptoClientStatus = 'completed' | 'pending' | 'failed';
export type CryptoWorkerStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

export interface CryptoProduct {
  id: string;
  status: CryptoProductStatus;
  nameProduct: string;
  reference: string;
  Description: string;
  lengthProduct: number;
  widthProduct: number;
  units: string;
}

export interface CryptoClient {
  id: string;
  status: CryptoClientStatus;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  idNumber: number;
  phoneNumber: number;
  cityName: string;
  neighborhood: string;
  quota: number;
}

export interface CryptoWorker {
  id: string;
  status: CryptoWorkerStatus;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  idNumber: number;
  phoneNumber: number;
  direction: string;
  neighborhood: string;
}