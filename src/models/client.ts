export type ClientStatus = 'ACTIVO' | 'INACTIVO';

export interface Client {
    cliente:{
        id: number,
        persona: {
            id: number,
            identificacion:string,
            primerNombre:string,
            segundoNombre:string,
            primerApellido:string,
            segundoApellido:string,
            direccion:string,
            telefono:string,
            barrio: {
                id:number,
                nombre:string,
                zona: {
                    id:number,
                    nombre:string,
                    ciudad: {
                        id:number,
                        nombre: string,
                        region: {
                            id: number,
                            nombre: string,
                            departamento: {
                                id:number,
                                nombre: string,
                                pais: {
                                    id:number,
                                    nombre: string
                                }
                            }
                        }
                    }
                }
            }
        },
        cuentaCliente: {
            id:number,
            cupo:number,
            saldoDeuda: number,
            estadoCuentaCliente: {
                id: number,
                estado: string
            },
            detalleCuentaFavor: {
                id:number,
                valor:number
            }
        },
        estado: {
            id:number,
            nombre: string
        }
    },
    referencias: [
        {
            nombre:string,
            telefono:string,
            parentesco: string
        },
        {
            nombre: string,
            telefono: string,
            parentesco: string
        }
    ]
}