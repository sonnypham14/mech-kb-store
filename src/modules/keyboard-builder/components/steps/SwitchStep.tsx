'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useBuilderSwitches } from '@/modules/keyboard-builder/hooks/useBuilderQuery';
import { BuilderPartCard } from '@/modules/keyboard-builder/components/BuilderPartCard';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Skeleton } from '@/components/ui/skeleton';
import type { IBuilderSwitch, IBuilderPart } from '@/modules/keyboard-builder/types';

const SWITCH_TYPE_TABS = [
  { value: 'all', label: 'All' },
  { value: 'linear', label: 'Linear' },
  { value: 'tactile', label: 'Tactile' },
  { value: 'clicky', label: 'Clicky' },
] as const;

type SwitchTabValue = (typeof SWITCH_TYPE_TABS)[number]['value'];

function SwitchCard({
  sw,
  isSelected,
  onSelect,
}: {
  sw: IBuilderSwitch;
  isSelected: boolean;
  onSelect: (part: IBuilderPart) => void;
}) {
  const enriched: IBuilderPart = {
    ...sw,
    specs: {
      ...sw.specs,
      'Actuation Force': `${sw.actuation}g`,
      'Travel Distance': `${sw.travel}mm`,
      Type: sw.type.charAt(0).toUpperCase() + sw.type.slice(1),
    },
  };

  return <BuilderPartCard part={enriched} isSelected={isSelected} onSelect={onSelect} />;
}

export function SwitchStep() {
  const [activeTab, setActiveTab] = useState<SwitchTabValue>('all');
  const { data: switches, isLoading } = useBuilderSwitches(activeTab === 'all' ? undefined : activeTab);
  const selectedSwitch = useBuilderStore((s) => s.selectedSwitch);
  const setSwitch = useBuilderStore((s) => s.setSwitch);

  const handleSelect = (part: IBuilderPart) => {
    const switchItem = part as IBuilderSwitch;
    if (selectedSwitch?.id === switchItem.id) {
      setSwitch(null);
    } else {
      setSwitch(switchItem);
    }
  };

  const renderGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
      );
    }

    if (!switches || switches.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-white/30 mt-4">
          <p className="text-lg">No switches found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {switches.map((sw) => (
          <SwitchCard
            key={sw.id}
            sw={sw}
            isSelected={selectedSwitch?.id === sw.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Choose Your Switches</h2>
        <p className="text-sm text-white/50 mt-1">
          Switches define the feel and sound of every keystroke.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SwitchTabValue)}>
        <TabsList className="bg-white/10 border border-white/10">
          {SWITCH_TYPE_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/60"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {SWITCH_TYPE_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {renderGrid()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
