import { NextRequest, NextResponse } from 'next/server';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:1337';

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  return proxyToStrapiUploads(request, resolvedParams.slug);
}

export async function POST(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  return proxyToStrapiUploads(request, resolvedParams.slug);
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  return proxyToStrapiUploads(request, resolvedParams.slug);
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  return proxyToStrapiUploads(request, resolvedParams.slug);
}

export async function PATCH(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  return proxyToStrapiUploads(request, resolvedParams.slug);
}

async function proxyToStrapiUploads(request: NextRequest, slug: string[]) {
  try {
    const url = new URL(request.url);
    const targetPath = slug.join('/');
    const targetUrl = `${STRAPI_BASE_URL}/uploads/${targetPath}${url.search}`;

    // Get request body if it exists (for upload operations)
    let body: FormData | ArrayBuffer | undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        // For file uploads, we need to handle FormData
        const contentType = request.headers.get('content-type');
        if (contentType?.includes('multipart/form-data')) {
          body = await request.formData();
        } else {
          body = await request.arrayBuffer();
        }
      } catch (error) {
        // Body might be empty or already consumed
        body = undefined;
      }
    }

    // Prepare headers
    const headers: Record<string, string> = {};
    
    // Copy relevant headers from the original request
    const headersToProxy = [
      'authorization',
      'content-type',
      'accept',
      'accept-language',
      'cache-control',
      'user-agent',
      'accept-encoding',
      'range',
      'if-none-match',
      'if-modified-since'
    ];

    headersToProxy.forEach(header => {
      const value = request.headers.get(header);
      if (value) {
        headers[header] = value;
      }
    });

    // Add API token if available
    if (process.env.STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    // Make the request to Strapi
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body,
    });

    // For file responses, we want to stream the content
    const responseHeaders = new Headers();
    
    // Copy relevant headers from Strapi response
    const headersToReturn = [
      'content-type',
      'content-length',
      'content-disposition',
      'cache-control',
      'etag',
      'last-modified',
      'expires',
      'accept-ranges',
      'content-range',
      'content-encoding'
    ];

    headersToReturn.forEach(header => {
      const value = response.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    });

    // Add CORS headers for media files
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, Range');

    // For file downloads/streaming, we want to return the response body as-is
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Upload proxy error:', error);
    return NextResponse.json(
      { error: 'Upload proxy request failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept, Range',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
}
