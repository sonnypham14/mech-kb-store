'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
] as const;

type Locale = (typeof routing.locales)[number];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const current = LANGUAGES.find((l) => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 gap-1"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {current?.flag} {current?.code.toUpperCase()}
          </span>
          <span className="sm:hidden">{current?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-gray-900/95 backdrop-blur-md border-white/20 text-white"
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={`cursor-pointer hover:bg-white/10 focus:bg-white/10 ${
              locale === lang.code ? 'font-semibold text-purple-400' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
