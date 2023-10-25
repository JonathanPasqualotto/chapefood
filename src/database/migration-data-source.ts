import { DataSource } from "typeorm";
import { CommonDataSourceOptions } from "./options";

export const AppDataSource = new DataSource({
    ...CommonDataSourceOptions,
    type: "sqlite",
    database: "src/database/migration/migration-database.sqlite",
    synchronize: false,
    migrationsRun: true,
    logging: false,
});