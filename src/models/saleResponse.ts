export type SaleStatus = 'ACTIVO' | 'INACTIVO';

export interface saleResponse {
    id: number,
    fecha: string,
    valorTotal: number,
    trabajador: {
        id: number,
        persona: {
            id: number,
            identificacion: string,
            primerNombre: string,
            segundoNombre: string,
            primerApellido: string,
            segundoApellido: string,
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
        },
        correo: string
    },
    formaPago: {
        id: number,
        nombre: string,
        numeroDias: number,
        valorMinimo: number
    },
    modalidad: {
        id: number,
        nombre: string
    },
    cuentaCliente: {
        id: number,
        cupo: number,
        saldoDeuda: number,
        estadoCuentaCliente: {
            id: number,
            estado: string
        },
        detalleCuentaFavor: {
            id: number,
            valor: number
        }
    },
    estadoVenta: {
        id: number,
        nombre: string
    }
}