export type ProductStatus = 'ACTIVO' | 'INACTIVO';

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