export type PaymentStatus = 'ACTIVO' | 'INACTIVO';

export interface Payment {
    id:number,
    cliente: string,
    empleado: string,
    formaPago: string,
    modalidad:string,
    cuotaInicial: number,
    producto:string,
    cantidad:number,
    descuento:number,
    justificacion:string
}