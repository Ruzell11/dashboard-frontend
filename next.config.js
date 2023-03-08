/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = {
  nextConfig,
  eslint: {
    dirs: ['pages', 'components', 'lib', 'abc']
  }
};
