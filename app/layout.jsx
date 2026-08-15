import { Analytics } from '@vercel/analytics/next';

import { Inter, Space_Grotesk } from 'next/font/google';
import { AppProvider } from '@/lib/app-context';
import { AppShell } from '@/components/app-shell';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata = {
  title: 'KamiStream — Anime, Manga & Community',
  description:
  'Stream anime movies, read manga, follow anime news, and join the community. Premium content unlocked with a KPay subscription.',
  generator: 'v0.app'
};

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#0e1530'
};

export default function RootLayout({
  children


}) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${inter.variable} ${spaceGrotesk.variable}`}>
      
      <body className="font-sans antialiased">
        <AppProvider>
          <AppShell>{children}</AppShell>
          <Toaster position="top-center" />
        </AppProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>);

}