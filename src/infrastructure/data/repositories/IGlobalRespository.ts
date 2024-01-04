import { AxiosResponse } from "axios"

export interface IGlobalRepository<T, DTO> {

    save: (bodyDTO: DTO) => Promise<AxiosResponse<T>>

    update: (id: string, bodyDTO: DTO) => Promise<AxiosResponse<string>>

    delete: (id: string) => Promise<AxiosResponse<T>>

    deleteAll: () => Promise<AxiosResponse<string>>

    getById: (id: string) => Promise<AxiosResponse<T>>

    getAll: () => Promise<AxiosResponse<T[]>>

}