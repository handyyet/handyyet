/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
    return [
      {
        source: '/ig',
        destination: '/?utm_source=instagram&utm_medium=bio',
        permanent: false,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
