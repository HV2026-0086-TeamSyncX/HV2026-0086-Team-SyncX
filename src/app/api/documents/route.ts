import { NextRequest, NextResponse } from 'next/server';
import { getDbDocuments, saveDbDocument, deleteDbDocument, clearDbDocuments } from '@/lib/localDb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const docs = getDbDocuments();
    return NextResponse.json({ success: true, documents: docs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body && body.document) {
      saveDbDocument(body.document);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Document object required' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const docId = searchParams.get('id');
    const clearAll = searchParams.get('clearAll');

    if (clearAll === 'true') {
      clearDbDocuments();
      return NextResponse.json({ success: true });
    }

    if (docId) {
      deleteDbDocument(docId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Document ID required' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
