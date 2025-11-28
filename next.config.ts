import type { NextConfig } from 'next';

import './src/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
};

export default nextConfig;
