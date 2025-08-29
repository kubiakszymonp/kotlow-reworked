import { NextRequest, NextResponse } from 'next/server';
import { getCurrentEnvironmentConfig } from '@/lib/environments';

const config = getCurrentEnvironmentConfig();
const STRAPI_BASE_URL = config.strapi.baseUrl;

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  console.log('resolvedParams', resolvedParams);
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
    if (config.strapi.apiToken) {
      headers['Authorization'] = `Bearer ${config.strapi.apiToken}`;
    }

    // Make the request to Strapi
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body,
    });

    // Get response data
    const responseData = await response.text();
    
    // Prepare response headers
    const responseHeaders = new Headers();
    
    // Copy relevant headers from Strapi response
    const headersToReturn = [
      'content-type',
      'cache-control',
      'etag',
      'last-modified',
      'content-length'
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

    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

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
