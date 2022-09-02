export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export type ProductStatus = 'completed' | 'pending' | 'failed';
export type ClientStatus = 'completed' | 'pending' | 'failed';
export type WorkerStatus = 'completed' | 'pending' | 'failed';
export type DispatchStatus = 'completed' | 'pending' | 'failed';
export type ReceiveStatus = 'completed' | 'pending' | 'failed';
export type EditRouteStatus = 'completed' | 'pending' | 'failed';

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

export interface Product {
  id: string;
  status: ProductStatus;
  nameProduct: string;
  reference: string;
  Description: string;
  lengthProduct: number;
  widthProduct: number;
  units: string;
}

export interface Client {
  id: string;
  status: ClientStatus;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  idNumber: number;
  phoneNumber: number;
  cityName: string;
  neighborhood: string;
  quota: number;
  currency: string;
  referenceCompleteName: string;
  referencePhoneNumber: number;
  relationship:string;
  referenceCompleteNameSecond: string;
  referencePhoneNumberSecond: number;
  relationshipSecond:string;
}

export interface Worker {
  id: string;
  status: WorkerStatus;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  idNumber: number;
  phoneNumber: number;
  direction: string;
  neighborhood: string;
}

export interface Dispatch {
  id: string;
  amount:number;
  status: ProductStatus;
  nameProduct: string;
  reference: string;
  Description: string;
  lengthProduct: number;
  widthProduct: number;
  units: string;
}

export interface Receive {
  id: string;
  amount:number;
  status: ProductStatus;
  nameProduct: string;
  reference: string;
}

export interface EditRoute {
  id: string;
  status: EditRouteStatus;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  routeOrder: number;
}