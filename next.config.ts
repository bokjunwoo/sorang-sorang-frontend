import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 중에 ESLint 검사를 무시하도록 설정
    ignoreDuringBuilds: true,
  },
  // 다른 설정 옵션들...
};

export default nextConfig;
