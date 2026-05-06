'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBuilderCases } from '@/modules/keyboard-builder/hooks/useBuilderQuery';
import { BuilderPartCard } from '@/modules/keyboard-builder/components/BuilderPartCard';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Skeleton } from '@/components/ui/skeleton';
import type { IBuilderCase, IBuilderPart } from '@/modules/keyboard-builder/types';

const LAYOUT_FILTERS = ['All', '60%', '65%', '75%', 'TKL', '100%'] as const;
type LayoutFilter = (typeof LAYOUT_FILTERS)[number];

export function CaseStep() {
  const [activeFilter, setActiveFilter] = useState<LayoutFilter>('All');
  const { data: cases, isLoading } = useBuilderCases();
  const selectedCase = useBuilderStore((s) => s.selectedCase);
  const setCase = useBuilderStore((s) => s.setCase);

  const filtered =
    activeFilter === 'All'
      ? (cases ?? [])
      : (cases ?? []).filter((c) => c.layout === activeFilter);

  const handleSelect = (part: IBuilderPart) => {
    const caseItem = part as IBuilderCase;
    if (selectedCase?.id === caseItem.id) {
      setCase(null);
    } else {
      setCase(caseItem);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Choose Your Case</h2>
        <p className="text-sm text-white/50 mt-1">
          The case defines the layout and sound profile of your build.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {LAYOUT_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${activeFilter === filter
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10'
              }
            `}
          >
            {filter}
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
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/30">
          <p className="text-lg">No cases found for this layout</p>
          <button
            onClick={() => setActiveFilter('All')}
            className="mt-2 text-sm text-purple-400 hover:underline"
          >
            Show all
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((caseItem) => (
            <BuilderPartCard
              key={caseItem.id}
              part={caseItem}
              isSelected={selectedCase?.id === caseItem.id}
              onSelect={handleSelect}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
