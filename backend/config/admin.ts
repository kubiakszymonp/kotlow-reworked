export default ({ env }) => {
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

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    // Configure admin panel URL
    url: env('ADMIN_URL', '/admin'),
    serveAdminPanel: env.bool('SERVE_ADMIN_PANEL', true),
    // Configure allowed hosts for Vite dev server
    vite: {
      server: {
        host: '0.0.0.0',
        allowedHosts: allowedHosts,
      },
    },
  };
};
