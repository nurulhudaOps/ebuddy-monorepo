import { logger } from '../../utils/logger';
import { adminDb } from './connection';

export const initializeApp = () => {
  adminDb
    .listCollections()
    .then(() => {
      logger.info('firebase collections listed successfully');
    })
    .catch((error) => {
      logger.error('Error listing collections:', error);
    });
};

// Get all documents in a collection
export async function getCollectionData<T>(collectionName: string): Promise<T[]> {
  const db = adminDb.collection(collectionName);
  const result = await db.get();
  return result.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
}

// Get one document by ID
export async function getDocumentData<T>(collectionName: string, docId: string): Promise<T | null> {
  const db = adminDb.collection(collectionName);
  const result = await db.doc(docId).get();
  if (!result.exists) return null;
  return { id: result.id, ...result.data() } as T;
}

// Add a new document (auto-generated ID)
export async function addDocument<T>(collectionName: string, data: T): Promise<string> {
  const db = adminDb.collection(collectionName);
  const result = await db.add(data as any);
  return result.id;
}

// Update an existing document
export async function updateDocument<T>(
  collectionName: string,
  docId: string,
  data: Partial<T>,
): Promise<Date> {
  const db = adminDb.collection(collectionName);
  const result = await db.doc(docId).update(data);
  return result.writeTime.toDate();
}

// Delete a document
export async function deleteDocument(collectionName: string, docId: string): Promise<Date> {
  const db = adminDb.collection(collectionName);
  const result = await db.doc(docId).delete();
  return result.writeTime.toDate();
}
