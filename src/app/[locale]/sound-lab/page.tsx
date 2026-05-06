import { SoundLabGrid } from '@/modules/sound-lab/components/SoundLabGrid';

export const metadata = {
  title: 'Sound Lab | MechKeys',
  description: 'Listen to mechanical keyboard switch sounds before you buy.',
};

export default function SoundLabPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SoundLabGrid />
      </div>
    </main>
  );
}
