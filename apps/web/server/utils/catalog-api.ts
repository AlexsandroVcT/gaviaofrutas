import { createError, getQuery, readBody } from 'h3';
import type { H3Event } from 'h3';

function normalizeBaseUrl(value: string) {
  return value.replace(/\/$/, '');
}

function buildCatalogUrl(baseUrl: string, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizeBaseUrl(baseUrl)}${normalizedPath}`;
}

async function parseJsonResponse<T>(response: Response) {
  const text = await response.text();

  if (!text) {
    return null as T;
  }

  return JSON.parse(text) as T;
}

function getCatalogApiBase() {
  const config = useRuntimeConfig();
  const baseUrl = String(config.catalogApiBase || '').trim();

  if (!baseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Catalog API base is not configured',
    });
  }

  return baseUrl;
}

export async function proxyCatalogGet<T>(event: H3Event, path: string) {
  const baseUrl = getCatalogApiBase();
  const targetUrl = new URL(buildCatalogUrl(baseUrl, path));
  const query = getQuery(event);

  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          targetUrl.searchParams.append(key, String(item));
        }
      }
      continue;
    }

    if (value !== undefined && value !== null) {
      targetUrl.searchParams.set(key, String(value));
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream responded with ${response.status}`);
    }

    return await parseJsonResponse<T>(response);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw createError({
      statusCode: 502,
      statusMessage: `Catalog API request failed for ${path}`,
      data: {
        upstream: targetUrl.toString(),
        reason,
      },
      cause: error,
    });
  }
}

export async function proxyCatalogPost<T>(event: H3Event, path: string) {
  const baseUrl = getCatalogApiBase();
  const body = await readBody(event);
  const targetUrl = buildCatalogUrl(baseUrl, path);

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body ?? {}),
    });

    if (!response.ok) {
      throw new Error(`Upstream responded with ${response.status}`);
    }

    return await parseJsonResponse<T>(response);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw createError({
      statusCode: 502,
      statusMessage: `Catalog API request failed for ${path}`,
      data: {
        upstream: targetUrl,
        reason,
      },
      cause: error,
    });
  }
}
