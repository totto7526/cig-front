export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export type CryptoProductStatus = 'disponible' | 'pedido' | 'agotado';


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
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  medidas: string;
  currency: string;
}