import express, { type Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import env from '@env';

const app: Express = express();

app.use(express.json());
app.use(cors({
    origin: env.API_CORS_ORIGIN,
    credentials: true
}));
app.use(session({
    secret: env.API_KEY_SECRET,
    resave: true,
    saveUninitialized: true
}));

export default app;