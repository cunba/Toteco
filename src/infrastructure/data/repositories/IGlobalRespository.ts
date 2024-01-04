export interface IGlobalRepository<T, DTO> {

    save: (bodyDTO: DTO) => Promise<T>

    update: (id: string, bodyDTO: DTO) => Promise<string>

    delete: (id: string) => Promise<T>

    deleteAll: () => Promise<string>

    getById: (id: string) => Promise<T>

    getAll: () => Promise<T[]>

}