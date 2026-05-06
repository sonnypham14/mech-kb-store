import { BuilderWizard } from '@/modules/keyboard-builder/components/BuilderWizard';
import { Keyboard } from 'lucide-react';

export const metadata = {
  title: 'Keyboard Builder | MechKeys',
  description: 'Build your dream mechanical keyboard step by step.',
};

export default function BuilderPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 mb-4">
            <Keyboard className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-400">Custom Build Tool</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Build Your Perfect Keyboard
          </h1>
          <p className="mt-3 text-white/50 text-base max-w-xl mx-auto">
            Select each component step by step and preview your build before adding to cart.
          </p>
        </div>

        <BuilderWizard />
      </div>
    </main>
  );
}
