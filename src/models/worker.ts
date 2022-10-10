export type WorkerStatus = 'ACTIVO' | 'INACTIVO';

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
    },
    correo:string
}