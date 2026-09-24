import fs from 'node:fs';
import path from 'node:path';
import { DocumentAnalysis } from './types';
import { SAMPLE_DOCUMENTS } from './sampleData';

const DB_FILE = path.join(process.cwd(), 'dev.db');

interface LocalDatabaseSchema {
  version: number;
  updatedAt: string;
  documents: DocumentAnalysis[];
}

function initDb(): LocalDatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.documents) && parsed.documents.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('dev.db read notice, creating fresh store:', err);
  }

  const initial: LocalDatabaseSchema = {
    version: 1,
    updatedAt: new Date().toISOString(),
    documents: SAMPLE_DOCUMENTS
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  } catch (err) {
    console.warn('dev.db init write error:', err);
  }

  return initial;
}

export function getDbDocuments(): DocumentAnalysis[] {
  const db = initDb();
  return db.documents || [];
}

export function saveDbDocument(doc: DocumentAnalysis): boolean {
  try {
    const db = initDb();
    const existingIdx = db.documents.findIndex((d) => d.id === doc.id);
    if (existingIdx >= 0) {
      db.documents[existingIdx] = doc;
    } else {
      db.documents.unshift(doc);
    }
    db.updatedAt = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save document to dev.db:', err);
    return false;
  }
}

export function deleteDbDocument(docId: string): boolean {
  try {
    const db = initDb();
    db.documents = db.documents.filter((d) => d.id !== docId);
    db.updatedAt = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to delete document from dev.db:', err);
    return false;
  }
}

export function clearDbDocuments(): boolean {
  try {
    const initial: LocalDatabaseSchema = {
      version: 1,
      updatedAt: new Date().toISOString(),
      documents: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to clear dev.db:', err);
    return false;
  }
}
