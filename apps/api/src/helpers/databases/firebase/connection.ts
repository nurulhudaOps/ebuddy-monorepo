import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import configs from '../../../configs';

if (!getApps().length) {
  const { firebase } = configs;

  initializeApp({
    credential: cert(firebase as any),
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
