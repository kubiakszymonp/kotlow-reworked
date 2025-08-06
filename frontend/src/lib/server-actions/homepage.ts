'use server';

import { apiClient } from '../api-client';
import { apiCall, createApiParams, revalidateApiTags } from '../api-utils';
import { config } from '../config';
import { 
  HomepageResponse, 
  HomepageRequest,
  FooterRequestData 
} from '@/api/generated';

// Get homepage
export async function getHomepage(options?: {
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams(options || {});
  
  return apiCall(
    () => apiClient.homepage.getHomepage(params),
    {
      tags: [config.cache.tags.homepage],
    }
  );
}

// Update homepage
export async function updateHomepage(homepageData: FooterRequestData) {
  const homepageRequest: HomepageRequest = {
    data: homepageData,
  };
  
  const result = await apiCall(
    () => apiClient.homepage.putHomepage({ homepageRequest }),
    {
      tags: [config.cache.tags.homepage],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.homepage]);
  }
  
  return result;
}

// Delete homepage
export async function deleteHomepage() {
  const result = await apiCall(
    () => apiClient.homepage.deleteHomepage(),
    {
      tags: [config.cache.tags.homepage],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.homepage]);
  }
  
  return result;
} 