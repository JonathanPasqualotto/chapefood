import { IEmpresa } from "../../Empresa/interfaces/IEmpresa"

export interface ApiData{
    id?: number
    capacidade?: number
    descricao?: string
    empresa?: IEmpresa
}
