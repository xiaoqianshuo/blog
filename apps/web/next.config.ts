import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 或 ['http', 'https'] 允许 http（更不安全）
        hostname: '*', // 匹配所有域名（包括子域名）
        // port: '', // 空字符串表示匹配任意端口（或指定具体端口，如 '8080'）
        // pathname: '**', // 匹配所有路径（任意层级的子路径）
      },
    ],
  },
};

export default nextConfig;
