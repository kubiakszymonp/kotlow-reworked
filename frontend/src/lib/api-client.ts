import { config } from './config';
import { 
  ArticleApi, 
  FooterApi, 
  HomepageApi, 
  NavigationApi, 
  UploadFileApi,
  UsersPermissionsAuthApi,
  UsersPermissionsUsersRolesApi,
  Configuration
} from '@/api/generated';

// Create a custom configuration for the API client
const createApiConfiguration = () => {
  return new Configuration({
    basePath: config.api.baseUrl,
    headers: {
      'Authorization': config.api.apiToken ? `Bearer ${config.api.apiToken}` : undefined,
      'Content-Type': 'application/json',
    },
    fetchApi: fetch,
  });
};

// Create API instances
const createApiInstances = () => {
  const apiConfig = createApiConfiguration();
  
  return {
    articles: new ArticleApi(apiConfig),
    footer: new FooterApi(apiConfig),
    homepage: new HomepageApi(apiConfig),
    navigation: new NavigationApi(apiConfig),
    upload: new UploadFileApi(apiConfig),
    auth: new UsersPermissionsAuthApi(apiConfig),
    users: new UsersPermissionsUsersRolesApi(apiConfig),
  };
};

// Export the API client
export const apiClient = createApiInstances();

// Export individual APIs for convenience
export const { articles, footer, homepage, navigation, upload, auth, users } = apiClient;

// Type for API client
export type ApiClient = typeof apiClient; 