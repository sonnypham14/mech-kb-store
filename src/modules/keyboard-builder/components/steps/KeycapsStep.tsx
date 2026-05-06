'use client';

import { useState } from 'react';
import { useBuilderKeycaps } from '@/modules/keyboard-builder/hooks/useBuilderQuery';
import { BuilderPartCard } from '@/modules/keyboard-builder/components/BuilderPartCard';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Skeleton } from '@/components/ui/skeleton';
import type { IBuilderKeycaps, IBuilderPart } from '@/modules/keyboard-builder/types';

const PROFILE_FILTERS = ['All', 'Cherry', 'OEM', 'SA', 'DSA', 'XDA', 'KAT', 'MT3'] as const;
type ProfileFilter = (typeof PROFILE_FILTERS)[number];

export function KeycapsStep() {
  const [activeProfile, setActiveProfile] = useState<ProfileFilter>('All');
  const { data: keycaps, isLoading } = useBuilderKeycaps();
  const selectedKeycaps = useBuilderStore((s) => s.selectedKeycaps);
  const setKeycaps = useBuilderStore((s) => s.setKeycaps);

  const filtered =
    activeProfile === 'All'
      ? (keycaps ?? [])
      : (keycaps ?? []).filter((k) => k.profile.toLowerCase().includes(activeProfile.toLowerCase()));

  const handleSelect = (part: IBuilderPart) => {
    const keycapItem = part as IBuilderKeycaps;
    if (selectedKeycaps?.id === keycapItem.id) {
      setKeycaps(null);
    } else {
      setKeycaps(keycapItem);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Choose Your Keycaps</h2>
        <p className="text-sm text-white/50 mt-1">
          Keycaps define the look and feel of your typing experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PROFILE_FILTERS.map((profile) => (
          <button
            key={profile}
            onClick={() => setActiveProfile(profile)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${activeProfile === profile
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10'
              }
            `}
          >
            {profile}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-white/10">
              <Skeleton className="h-44 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/30">
          <p className="text-lg">No keycaps found for this profile</p>
          <button
            onClick={() => setActiveProfile('All')}
            className="mt-2 text-sm text-purple-400 hover:underline"
          >
            Show all
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((keycapItem) => (
            <BuilderPartCard
              key={keycapItem.id}
              part={keycapItem}
              isSelected={selectedKeycaps?.id === keycapItem.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
