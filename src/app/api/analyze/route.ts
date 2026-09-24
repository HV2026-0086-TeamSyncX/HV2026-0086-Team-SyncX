import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentWithGemini } from '@/lib/geminiClient';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let fileName = 'Uploaded_Document.pdf';
    let fileSizeBytes = 1024 * 1024 * 1.5;
    let mimeType = 'application/pdf';
    let base64Data = '';
    let customApiKey = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      customApiKey = (formData.get('customApiKey') as string) || '';

      if (file) {
        fileName = file.name;
        fileSizeBytes = file.size;
        mimeType = file.type || 'application/pdf';
        const buffer = await file.arrayBuffer();
        base64Data = Buffer.from(buffer).toString('base64');
      }
    } else {
      const body = await req.json();
      fileName = body.fileName || fileName;
      fileSizeBytes = body.fileSize || fileSizeBytes;
      mimeType = body.mimeType || mimeType;
      base64Data = body.base64Data || '';
      customApiKey = body.customApiKey || '';
    }

    const analysis = await analyzeDocumentWithGemini(
      base64Data,
      mimeType,
      fileName,
      fileSizeBytes,
      customApiKey
    );

    return NextResponse.json({ success: true, data: analysis });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze document' },
      { status: 500 }
    );
  }
}
