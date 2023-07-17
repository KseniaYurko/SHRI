/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "i.postimg.cc" }],
  },
};

module.exports = nextConfig;
