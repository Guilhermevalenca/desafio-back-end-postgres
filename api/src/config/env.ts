import { config } from 'dotenv';

config();

function env(...prefixes: string[]) {
    const obj = process.env;
    return Object.fromEntries(
        Object.entries(obj).filter(([chave]) =>
            prefixes.some(prefix => chave.startsWith(prefix))
        )
    );
}

export default env('API_', 'DATABASE');
