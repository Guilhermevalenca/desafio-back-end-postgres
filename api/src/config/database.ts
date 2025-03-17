import { Sequelize, type Dialect } from 'sequelize';
import env from '@env';

export default new Sequelize(
    env.DATABASE_NAME ?? 'postgres',
    env.DATABASE_USER ?? 'postgres',
    env.DATABASE_PASSWORD ?? 'postgres',
    {
        host: env.DATABASE_HOST ?? 'localhost',
        dialect: env.DATABASE_DIALECT as Dialect ?? 'postgres',
        logging: false
    }
)