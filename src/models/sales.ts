export type SalesStatus = 'ACTIVO' | 'INACTIVO';

export interface Sales {
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