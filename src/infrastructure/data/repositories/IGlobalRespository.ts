
export interface IGlobalRepository<T, DTO> {

    save: (body: DTO) => Promise<T | any>

    update: (id: string, body: T) => Promise<T | any>

    delete: (id: string) => Promise<T | any>

    getById: (id: string) => Promise<T | any>

    getAll: () => Promise<T[] | undefined>

}