'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/store/useBuilderStore';

function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(latest),
    });
    prevRef.current = value;
    return controls.stop;
  }, [value]);

  return <span>${displayValue.toFixed(2)}</span>;
}

interface ISummaryRow {
  label: string;
  value: string;
  price: number;
}

export function BuilderPriceSummary() {
  const selectedCase = useBuilderStore((s) => s.selectedCase);
  const selectedPcb = useBuilderStore((s) => s.selectedPcb);
  const selectedSwitch = useBuilderStore((s) => s.selectedSwitch);
  const selectedKeycaps = useBuilderStore((s) => s.selectedKeycaps);
  const totalPrice = useBuilderStore((s) => s.totalPrice);

  const total = totalPrice();

  const rows: ISummaryRow[] = [
    {
      label: 'Case',
      value: selectedCase ? selectedCase.name : '—',
      price: selectedCase?.price ?? 0,
    },
    {
      label: 'PCB',
      value: selectedPcb ? selectedPcb.name : '—',
      price: selectedPcb?.price ?? 0,
    },
    {
      label: 'Switch',
      value: selectedSwitch ? selectedSwitch.name : '—',
      price: selectedSwitch?.price ?? 0,
    },
    {
      label: 'Keycaps',
      value: selectedKeycaps ? selectedKeycaps.name : '—',
      price: selectedKeycaps?.price ?? 0,
    },
  ];

  return (
    <div className="rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-5">
      <h3 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Build Summary</h3>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-white/40 uppercase tracking-wide">{row.label}</span>
              <span className="text-xs text-white/80 truncate">{row.value}</span>
            </div>
            <span className="text-xs font-medium text-white shrink-0">
              {row.price > 0 ? `$${row.price.toFixed(2)}` : '—'}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4 bg-white/10" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Total</span>
        <motion.span
          key={total}
          initial={{ scale: 1.1, color: '#a855f7' }}
          animate={{ scale: 1, color: '#ffffff' }}
          transition={{ duration: 0.4 }}
          className="text-lg font-bold"
        >
          <AnimatedPrice value={total} />
        </motion.span>
      </div>

      {total === 0 && (
        <p className="mt-3 text-center text-xs text-white/30">Select parts to see the total price</p>
      )}
    </div>
  );
}
