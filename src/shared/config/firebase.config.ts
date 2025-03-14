import * as admin from 'firebase-admin';
import { configVar } from './env.config';

const firebaseConfigString = `{
  "type": "${configVar.FIREBASE.TYPE}",
  "project_id": "${configVar.FIREBASE.PROJECT_ID}",
  "private_key_id": "${configVar.FIREBASE.PRIVATE_KEY_ID}",
  "private_key": "${configVar.FIREBASE.PRIVATE_KEY}",
  "client_email": "${configVar.FIREBASE.CLIENT_EMAIL}",
  "client_id": "${configVar.FIREBASE.CLIENT_ID}",
  "auth_uri": "${configVar.FIREBASE.AUTH_URI}",
  "token_uri": "${configVar.FIREBASE.TOKEN_URI}",
  "auth_provider_x509_cert_url": "${configVar.FIREBASE.AUTH_PROVIDER_X509_CERT_URL}",
  "client_x509_cert_url": "${configVar.FIREBASE.CLIENT_X509_CERT_URL}",
  "universe_domain": "${configVar.FIREBASE.UNIVERSE_DOMAIN}",
  "bucket": "${configVar.FIREBASE.BUCKET}"
}`;
const firebaseConfig = JSON.parse(firebaseConfigString);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: firebaseConfig.project_id,
    storageBucket: firebaseConfig.bucket,
  });
}

export const firebaseAdmin = admin;
