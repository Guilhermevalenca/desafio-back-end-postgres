import { config } from 'dotenv';

config();

function env(obj: Object, prefixes: string[]) {
    return Object.fromEntries(
        Object.entries(obj).filter(([chave]) =>
            prefixes.some(prefix => chave.startsWith(prefix))
        )
    );
}

export default env(process.env, ['API_', 'DATABASE_']);