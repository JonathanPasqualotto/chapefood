import "reflect-metadata";
import { DataSource } from "typeorm";
import * as SQLite from "expo-sqlite";
import { CommonDataSourceOptions } from "./options";


export const database = new DataSource({
    ...CommonDataSourceOptions,
    database: ":memory:",
    driver: SQLite,
    type: 'expo',
    synchronize: false, //essa flag deve ser 'false' quando em producao
    migrationsRun: true,
    logging: false

});
