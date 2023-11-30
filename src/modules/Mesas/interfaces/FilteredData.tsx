import { IEmpresa } from "../../Empresa/interfaces/IEmpresa"

export interface FilteredData{
    id?: number
    capacidade?: number
    descricao?: string
    empresa?: IEmpresa
}
