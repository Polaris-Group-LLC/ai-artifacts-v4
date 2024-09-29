import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'app1',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Page': './app/page.tsx',
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

export default nextConfig;
