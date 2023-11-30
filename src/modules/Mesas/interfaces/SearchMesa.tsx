import { IEmpresa } from "../../Empresa/interfaces/IEmpresa"

export interface SearchMesa{
    id?: number
    capacidade?: number
    descricao?: string
    empresa?: IEmpresa[]
}