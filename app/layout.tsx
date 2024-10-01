import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { PostHogProvider } from './providers'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PostHogProvider>
        <body className={montserrat.className}>
          {children}
        </body>
      </PostHogProvider>
    </html>
  )
}
