# Module Federation Setup and Usage

## What We've Done

We've configured our Next.js application to use Module Federation, allowing us to share components and pages across different applications. Specifically, we've set up our main page (`app/page.tsx`) to be shared as a federated module.

### Configuration Details

1. We've modified `next.config.mjs` to use the `NextFederationPlugin` from `@module-federation/nextjs-mf`.
2. Our app is named 'app1' in the federation configuration.
3. We're exposing our main page component (`app/page.tsx`) as './Page'.
4. React and ReactDOM are set as shared dependencies to ensure consistency.
5. We've enabled `exposePages` to automatically expose all Next.js pages.

## For Developers: How to Dynamically Import Shared Components

To use the shared components in another application (let's call it the host application), follow these steps:

1. Install the necessary dependencies in your host application:

   ```bash
   npm install @module-federation/nextjs-mf
   ```

2. Configure the host application's `next.config.mjs`:

   ```javascript
   import { NextFederationPlugin } from '@module-federation/nextjs-mf';

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     webpack(config, options) {
       config.plugins.push(
         new NextFederationPlugin({
           name: 'host',
           remotes: {
             app1: 'app1@http://localhost:3000/_next/static/chunks/remoteEntry.js',
           },
           shared: {
             react: { singleton: true, eager: true, requiredVersion: false },
             'react-dom': { singleton: true, eager: true, requiredVersion: false },
           },
         })
       );
       return config;
     },
   };

   export default nextConfig;
   ```

   Note: Replace `http://localhost:3000` with the actual URL where app1 is hosted.

3. To dynamically import the shared page in your host application:

   ```typescript
   import dynamic from 'next/dynamic';
   import { Suspense } from 'react';

   const RemotePage = dynamic(() => import('app1/Page'), {
     ssr: false, // Set to true if you want server-side rendering
   });

   export default function HostPage() {
     return (
       <div>
         <h1>Host Application</h1>
         <Suspense fallback={<div>Loading remote page...</div>}>
           <RemotePage />
         </Suspense>
       </div>
     );
   }
   ```

4. For TypeScript support, you may need to add type declarations. Create a `remote-types.d.ts` file in your host app:

   ```typescript
   declare module 'app1/Page' {
     const Page: React.ComponentType;
     export default Page;
   }
   ```

## Important Notes

- Ensure that the versions of React and Next.js are compatible across your federated applications.
- Be cautious with server components when using Module Federation, as they may not always work as expected.
- Always test thoroughly in a staging environment before deploying to production.
- Keep an eye on the [@module-federation/nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf) package for updates and potential breaking changes.

## Troubleshooting

If you encounter issues:
1. Check that all applications are running and accessible.
2. Verify that the remote entry URL is correct in the host configuration.
3. Clear browser caches and rebuild both applications.
4. Consult the [Module Federation Examples](https://github.com/module-federation/module-federation-examples) for more complex setups and solutions.

Remember to adjust these instructions based on your specific setup and requirements. Module Federation in Next.js is a powerful but complex feature, so don't hesitate to refer to the official documentation and community resources for advanced use cases or troubleshooting.
