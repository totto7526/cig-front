export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export type ProductStatus = 'ACTIVO' | 'INACTIVO';
export type ClientStatus = 'completed' | 'pending' | 'failed';
export type WorkerStatus = 'ACTIVO' | 'INACTIVO';
export type DispatchStatus = 'ACTIVO' | 'INACTIVO';
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
    id: number,
    nombre: string,
    referencia:string,
    descripcion: string,
    estado: {
        id: number,
        nombre: string
    },
    dimension: {
        id: number,
        largo: number,
        ancho: number
    },
    categoria: {
        id: number,
        nombre:string
    },
    color: {
        id: number,
        nombre:string
    },
    cantidadExistente: number
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
    id: number,
    persona: {
        id: number,
        identificacion:string,
        primerNombre:string,
        segundoNombre:string,
        primerApellido:string,
        segundoApellido:string,
        direccion: string,
        telefono: string,
        barrio: {
            id: number,
            nombre: string,
            zona: {
                id: number,
                nombre: string,
                ciudad: {
                    id: number,
                    nombre: string,
                    region: {
                        id: number,
                        nombre: string,
                        departamento: {
                            id: number,
                            nombre: string,
                            pais: {
                                id: number,
                                nombre: string
                            }
                        }
                    }
                }
            }
        }
    },
    estado: {
        id: number,
        nombre: string
    }
}

export interface Dispatch {
  id: string;
  amount:number;
  status: DispatchStatus;
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
  status: ReceiveStatus;
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