import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'onleitechnologies.com' },
      { protocol: 'https', hostname: 'trf.co.in' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'arkajainuniversity.ac.in' },
      { protocol: 'https', hostname: 'sheffield.ac.uk' },
      { protocol: 'https', hostname: 'en.wikipedia.org' },
    ],
  },
};

export default nextConfig;
