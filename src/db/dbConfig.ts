import { DataSource, DataSourceOptions } from 'typeorm';

export const postgresConnectionOptions: DataSourceOptions={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'asdfg12345',
    database: 'tasks-db',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    synchronize: true,

    // entities: [`dist/**/*.entity.js`], // this will automatically load all entity file in the src folder
    // migrations: [`dist/db/migrations/*.js`]

}

export const mysqlConnectionOptions: DataSourceOptions={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'asdfg12345',
    database: 'tasks-db',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    synchronize: true,
}


const dataSource = new DataSource(postgresConnectionOptions);
export default dataSource;