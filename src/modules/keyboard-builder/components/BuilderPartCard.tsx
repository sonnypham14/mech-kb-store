'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { IBuilderPart } from '@/modules/keyboard-builder/types';

interface IBuilderPartCardProps {
  part: IBuilderPart;
  isSelected: boolean;
  onSelect: (part: IBuilderPart) => void;
}

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export function BuilderPartCard({ part, isSelected, onSelect }: IBuilderPartCardProps) {
  const [specsOpen, setSpecsOpen] = useState(false);

  const specEntries = Object.entries(part.specs);

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(part)}
      className={`relative cursor-pointer rounded-xl border transition-all duration-200
        bg-white/10 dark:bg-black/20 backdrop-blur-md
        ${isSelected
          ? 'border-purple-500 ring-2 ring-purple-500 ring-offset-0 shadow-lg shadow-purple-500/20'
          : 'border-white/20 hover:border-white/40'
        }
      `}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 shadow-md"
        >
          <Check className="h-3.5 w-3.5 text-white" />
        </motion.div>
      )}

      <div className="relative h-44 w-full overflow-hidden rounded-t-xl bg-white/5">
        <Image
          src={part.image}
          alt={part.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-purple-400">{part.brand}</p>
            <h3 className="text-sm font-semibold text-white leading-tight">{part.name}</h3>
          </div>
          <span className="shrink-0 text-sm font-bold text-white">${part.price.toFixed(2)}</span>
        </div>

        <p className="mt-1.5 text-xs text-white/60 line-clamp-2">{part.description}</p>

        {specEntries.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSpecsOpen((prev) => !prev);
              }}
              className="flex w-full items-center justify-between text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <span>Specifications</span>
              {specsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            <AnimatePresence>
              {specsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1 border-t border-white/10 pt-2">
                    {specEntries.map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-2 text-xs">
                        <span className="text-white/40 shrink-0">{key}</span>
                        <span className="text-white/80 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
