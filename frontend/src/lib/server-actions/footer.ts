'use server';

import { apiClient } from '../api-client';
import { apiCall, createApiParams, revalidateApiTags } from '../api-utils';
import { config } from '../config';
import { 
  FooterResponse, 
  FooterRequest,
  FooterRequestData 
} from '@/api/generated';

// Get footer
export async function getFooter(options?: {
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams(options || {});
  
  return apiCall(
    () => apiClient.footer.getFooter(params),
    {
      tags: [config.cache.tags.footer],
    }
  );
}

// Update footer
export async function updateFooter(footerData: FooterRequestData) {
  const footerRequest: FooterRequest = {
    data: footerData,
  };
  
  const result = await apiCall(
    () => apiClient.footer.putFooter({ footerRequest }),
    {
      tags: [config.cache.tags.footer],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.footer]);
  }
  
  return result;
}

// Delete footer
export async function deleteFooter() {
  const result = await apiCall(
    () => apiClient.footer.deleteFooter(),
    {
      tags: [config.cache.tags.footer],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.footer]);
  }
  
  return result;
} 