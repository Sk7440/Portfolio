import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  // FastAPI lives in api/index.py. In development it runs separately on :8000 (`npm run dev:api`);
  // on Vercel, /api/ is the Python function and FastAPI routes on the original /api/py/* path.
  rewrites: async () => [
    {
      source: '/api/py/:path*',
      destination: isDev ? 'http://127.0.0.1:8000/api/py/:path*' : '/api/',
    },
  ],
};

export default nextConfig;
