export type ReceiveStatus = 'completed' | 'pending' | 'failed';

export interface Receive {
    id: string;
    amount:number;
    status: ReceiveStatus;
    nameProduct: string;
    reference: string;
  }