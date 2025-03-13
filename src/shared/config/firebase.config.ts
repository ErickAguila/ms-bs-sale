// filepath: /path/to/firebase.config.ts
import * as admin from 'firebase-admin';
import * as serviceAccount from './sa-firebase.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    projectId: serviceAccount.project_id,
    storageBucket: serviceAccount.bucket,
  });
}

export const firebaseAdmin = admin;
