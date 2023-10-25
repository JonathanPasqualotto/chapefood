import {Empresa} from "./modules/Empresa";
import {Mesa} from "./modules/Mesa";
import {Pedido} from "./modules/Pedido";
import {Produto} from "./modules/Produto";
import {Usuario} from "./modules/Usuario";
import {CreateTableEmpresa1698173250073} from "./migration/1698173250073-CreateTableEmpresa";
import {CreateTableMesa1698173763070} from "./migration/1698173763070-CreateTableMesa";
import {CreateTablePedido1698173839824} from "./migration/1698173839824-CreateTablePedido";
import {CreateTableProduto1698173847751} from "./migration/1698173847751-CreateTableProduto";
import {CreateTableUsuario1698173857007} from "./migration/1698173857007-CreateTableUsuario";

const Entidades = [
    Empresa,
    Mesa,
    Pedido,
    Produto,
    Usuario
];

const Migrations= [
    CreateTableEmpresa1698173250073,
    CreateTableMesa1698173763070,
    CreateTablePedido1698173839824,
    CreateTableProduto1698173847751,
    CreateTableUsuario1698173857007
];

export const CommonDataSourceOptions = {
    entities: Entidades,
    migrations: Migrations,
    subscribers: [],
};
