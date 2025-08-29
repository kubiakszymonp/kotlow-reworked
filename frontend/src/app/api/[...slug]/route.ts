import { NextRequest, NextResponse } from 'next/server';

// Helper function to get Strapi base URL for proxy
function getStrapiProxyUrl(): string {
  // Check if we're running in Docker
  if (process.env.DATABASE_HOST === 'backend') {
    return 'http://backend:1337';
  }
  
  // Check for explicit Strapi URL from environment  
  if (process.env.STRAPI_BASE_URL) {
    return process.env.STRAPI_BASE_URL;
  }
  
  // Default to localhost for local development
  return 'http://localhost:1337';
}

const STRAPI_BASE_URL = getStrapiProxyUrl();

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('resolvedParams', resolvedParams);
  }
  return proxyToStrapi(request, resolvedParams.slug);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  return proxyToStrapi(request, resolvedParams.slug);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  return proxyToStrapi(request, resolvedParams.slug);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  return proxyToStrapi(request, resolvedParams.slug);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  return proxyToStrapi(request, resolvedParams.slug);
}

async function proxyToStrapi(request: NextRequest, slug: string[]) {
  try {
    const url = new URL(request.url);
    const targetPath = slug.join('/');
    const targetUrl = `${STRAPI_BASE_URL}/${targetPath}${url.search}`;

    // Get request body if it exists
    let body: string | undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        body = await request.text();
      } catch {
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
      'user-agent'
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

    // Get response data - handle both text and binary content
    let responseData;
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.startsWith('image/') || 
        contentType.startsWith('video/') || 
        contentType.startsWith('audio/') ||
        contentType.includes('application/octet-stream') ||
        contentType.includes('application/pdf')) {
      // For binary content, get as ArrayBuffer and convert to Uint8Array
      responseData = await response.arrayBuffer();
    } else {
      // For text content (JSON, HTML, etc.)
      responseData = await response.text();
    }
    
    // Prepare response headers
    const responseHeaders = new Headers();
    
    // Copy relevant headers from Strapi response
    const headersToReturn = [
      'content-type',
      'cache-control',
      'etag',
      'last-modified',
      'content-length',
      'content-disposition',
      'accept-ranges'
    ];

    headersToReturn.forEach(header => {
      const value = response.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    });

    // Add CORS headers if needed
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');

    // Return appropriate response type
    if (responseData instanceof ArrayBuffer) {
      // For binary content
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } else {
      // For text content
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed', message: error instanceof Error ? error.message : 'Unknown error' },
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
      'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
    },
  });
}
