import { ErrorResponse } from "../../exceptions/ErrorResponse";

export interface IRepository<T, TDTO> {

  save(element: TDTO): Promise<T | ErrorResponse>

  update(element: TDTO): Promise<T | ErrorResponse>

  delete(id: number): Promise<string | ErrorResponse>

  findAll(): Promise<T[] | ErrorResponse>

  findById(id: number): Promise<T | ErrorResponse>

}

export interface IUserRepository<T, TDTO> {

  save(element: TDTO): Promise<T | ErrorResponse>

  delete(id: number): Promise<string | ErrorResponse>

  findById(id: number): Promise<T | ErrorResponse>

}