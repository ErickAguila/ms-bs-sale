import * as admin from 'firebase-admin';
import { configVar } from './env.config';

const firebaseConfig = JSON.parse(configVar.FIREBASE_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: firebaseConfig.project_id,
    storageBucket: firebaseConfig.bucket,
  });
}

export const firebaseAdmin = admin;
