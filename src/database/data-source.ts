import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASSWORD as string,
  database: 'postgres',
  entities: [`src/**/*.entity.{js,ts}`],
  migrations: [`src/database/migrations/*.ts`],
  migrationsTableName: 'migrations',
});
