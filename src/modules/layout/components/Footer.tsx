import Link from 'next/link';
import { Keyboard, Github, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export async function Footer() {
  const locale = await getLocale();

  const footerLinks = {
    Shop: [
      { label: 'All Products', href: `/${locale}/products` },
      { label: 'Full-Size', href: `/${locale}/products?category=full-size` },
      { label: 'TKL', href: `/${locale}/products?category=tkl` },
      { label: '75%', href: `/${locale}/products?category=75-percent` },
      { label: '60%', href: `/${locale}/products?category=60-percent` },
    ],
    Build: [
      { label: 'KB Builder', href: `/${locale}/builder` },
      { label: 'Sound Lab', href: `/${locale}/sound-lab` },
      { label: 'Compare', href: `/${locale}/compare` },
    ],
    Company: [
      { label: 'About Us', href: `/${locale}/about` },
      { label: 'Blog', href: `/${locale}/blog` },
      { label: 'Contact', href: `/${locale}/about#contact` },
    ],
    Account: [
      { label: 'Login', href: `/${locale}/auth/login` },
      { label: 'Register', href: `/${locale}/auth/register` },
      { label: 'Dashboard', href: `/${locale}/dashboard` },
      { label: 'Cart', href: `/${locale}/cart` },
    ],
  };

  const socials = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900/80 backdrop-blur-md border-t border-white/10 text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600">
                <Keyboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">MechKeys Store</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your premier destination for premium mechanical keyboards and custom components.
              Built for enthusiasts, by enthusiasts.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">Stay in the loop</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 text-sm"
                />
                <Button variant="gradient" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} MechKeys Store. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex gap-4 text-xs text-white/40">
            <Link href="#" className="hover:text-white/70">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/70">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
