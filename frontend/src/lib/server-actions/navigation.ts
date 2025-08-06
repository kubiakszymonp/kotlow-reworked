'use server';

import { apiClient } from '../api-client';
import { apiCall, createApiParams, revalidateApiTags } from '../api-utils';
import { config } from '../config';
import { 
  NavigationResponse, 
  NavigationRequest,
  NavigationRequestData 
} from '@/api/generated';

// Get navigation
export async function getNavigation(options?: {
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams(options || {});
  
  return apiCall(
    () => apiClient.navigation.getNavigation(params),
    {
      tags: [config.cache.tags.navigation],
    }
  );
}

// Update navigation
export async function updateNavigation(navigationData: NavigationRequestData) {
  const navigationRequest: NavigationRequest = {
    data: navigationData,
  };
  
  const result = await apiCall(
    () => apiClient.navigation.putNavigation({ navigationRequest }),
    {
      tags: [config.cache.tags.navigation],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.navigation]);
  }
  
  return result;
}

// Delete navigation
export async function deleteNavigation() {
  const result = await apiCall(
    () => apiClient.navigation.deleteNavigation(),
    {
      tags: [config.cache.tags.navigation],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.navigation]);
  }
  
  return result;
} 