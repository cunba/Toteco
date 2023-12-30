import { TypeData, TypeDataDTO } from "../model/Type"


export interface ITypesApi {

    deleteType(id: number): Promise<string>

    getAllTypes(): Promise<TypeData[]>

    getTypeById(id: number): Promise<TypeData>

    getTypeByName(name: string): Promise<TypeData[]>

    getTypeByNameAndType(name: string, type: string): Promise<TypeData[]>

    getTypeByType(type: string): Promise<TypeData[]>

    saveType(body: TypeDataDTO): Promise<TypeData>

    updateType(id: number, body: TypeDataDTO): Promise<TypeData>

}