import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from './providers';
import { Header } from '@/modules/layout/components/Header';
import { Footer } from '@/modules/layout/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { CartDrawer } from '@/modules/cart/components/CartDrawer';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'MechKeys Store — Premium Mechanical Keyboards',
    template: '%s | MechKeys Store',
  },
  description:
    'Discover and build premium mechanical keyboards. Shop top brands like Keychron, Ducky, GMMK, Leopold, and more.',
  keywords: ['mechanical keyboard', 'keyboard', 'switches', 'keycaps', 'gaming keyboard'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MechKeys Store',
  },
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'vi')) {
    notFound();
  }

  // Explicitly seed the React cache with the locale from route params.
  // Required because next-intl reads the locale from the X-NEXT-INTL-LOCALE
  // header, which is only injected when the middleware does a rewrite.
  // For valid locale paths (/vi, /en) the middleware does a pass-through,
  // so we must set the locale here to avoid falling back to defaultLocale.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* Background gradient */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

            <Header />

            <main className="min-h-screen pt-16">
              {children}
            </main>

            <Footer />
            <CartDrawer />
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
