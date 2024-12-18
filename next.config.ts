import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',  // Static HTML 내보내기를 위한 설정
  images: {
    unoptimized: true,  // GitHub Pages 배포를 위한 이미지 설정
  },
  assetPrefix: './',  // 정적 파일 경로 설정
  eslint: {
    // 빌드 중에 ESLint 검사를 무시하도록 설정
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
