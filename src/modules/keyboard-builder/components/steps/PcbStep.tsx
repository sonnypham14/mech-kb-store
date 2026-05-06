'use client';

import { useState } from 'react';
import { useBuilderPcbs } from '@/modules/keyboard-builder/hooks/useBuilderQuery';
import { BuilderPartCard } from '@/modules/keyboard-builder/components/BuilderPartCard';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Skeleton } from '@/components/ui/skeleton';
import type { IBuilderPcb, IBuilderPart } from '@/modules/keyboard-builder/types';

export function PcbStep() {
  const [hotswapOnly, setHotswapOnly] = useState(false);
  const [wirelessOnly, setWirelessOnly] = useState(false);
  const { data: pcbs, isLoading } = useBuilderPcbs();
  const selectedPcb = useBuilderStore((s) => s.selectedPcb);
  const setPcb = useBuilderStore((s) => s.setPcb);

  const filtered = (pcbs ?? []).filter((pcb) => {
    if (hotswapOnly && !pcb.hotswap) return false;
    if (wirelessOnly && !pcb.wireless) return false;
    return true;
  });

  const handleSelect = (part: IBuilderPart) => {
    const pcbItem = part as IBuilderPcb;
    if (selectedPcb?.id === pcbItem.id) {
      setPcb(null);
    } else {
      setPcb(pcbItem);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Choose Your PCB</h2>
        <p className="text-sm text-white/50 mt-1">
          The PCB determines switch compatibility, RGB support, and connectivity options.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => setHotswapOnly((prev) => !prev)}
            className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5
              ${hotswapOnly ? 'bg-purple-500' : 'bg-white/20'}
            `}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                ${hotswapOnly ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </div>
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">Hotswap only</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => setWirelessOnly((prev) => !prev)}
            className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5
              ${wirelessOnly ? 'bg-purple-500' : 'bg-white/20'}
            `}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                ${wirelessOnly ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </div>
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">Wireless support</span>
        </label>
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
          <p className="text-lg">No PCBs match your filters</p>
          <button
            onClick={() => { setHotswapOnly(false); setWirelessOnly(false); }}
            className="mt-2 text-sm text-purple-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pcbItem) => (
            <BuilderPartCard
              key={pcbItem.id}
              part={pcbItem}
              isSelected={selectedPcb?.id === pcbItem.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
