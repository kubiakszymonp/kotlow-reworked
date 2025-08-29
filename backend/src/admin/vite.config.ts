import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Allow all common hosts
  const allowedHosts = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    'admin.sanktuariumkotlow.pl',
    'backend',
    'sanktuariumkotlow.pl',
    'www.sanktuariumkotlow.pl'
  ];

  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      host: true,
      allowedHosts: allowedHosts,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
