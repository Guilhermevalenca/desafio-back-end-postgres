import database from '@database';

export default async function init(): Promise<void> {
    await database.authenticate();
    await database.sync();
    console.log('Database connected and synced');
}
