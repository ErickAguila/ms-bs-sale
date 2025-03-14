import * as dotenv from 'dotenv';
dotenv.config();

export const configVar = {
  PORT: Number(process.env.PORT),
  FIREBASE: {
    TYPE: process.env.FIREBASE_TYPE,
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
    AUTH_URI: process.env.FIREBASE_AUTH_URI,
    TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
    AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    UNIVERSE_DOMAIN: process.env.FIREBASE_UNIVERSE_DOMAIN,
    BUCKET: process.env.FIREBASE_BUCKET,
  },
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
};

export const configEnv = () => configVar;
