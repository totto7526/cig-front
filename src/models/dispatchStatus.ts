export type DispatchStatus = 'ACTIVO' | 'INACTIVO';

export interface Dispatch {
    id: string;
    amount:number;
    status: string;
    nameProduct: string;
    reference: string;
    Description: string;
    lengthProduct: number;
    widthProduct: number;
    units: string;
  }