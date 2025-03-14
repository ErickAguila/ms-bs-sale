import * as dotenv from 'dotenv';
dotenv.config();

export const configVar = {
  PORT: Number(process.env.PORT),
  FIREBASE_CREDENTIALS: process.env.FIREBASE_CREDENTIALS,
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
};

export const configEnv = () => configVar;
