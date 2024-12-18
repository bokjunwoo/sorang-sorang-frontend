import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 중에 ESLint 검사를 무시하도록 설정
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;