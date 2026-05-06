'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { BuilderStep } from '@/modules/keyboard-builder/types';
import { useBuilderStore } from '@/store/useBuilderStore';

interface IStepConfig {
  step: BuilderStep;
  label: string;
  shortLabel: string;
}

const STEPS: IStepConfig[] = [
  { step: BuilderStep.Case, label: 'Case', shortLabel: 'Case' },
  { step: BuilderStep.Pcb, label: 'PCB', shortLabel: 'PCB' },
  { step: BuilderStep.Switch, label: 'Switch', shortLabel: 'SW' },
  { step: BuilderStep.Keycaps, label: 'Keycaps', shortLabel: 'KC' },
  { step: BuilderStep.Review, label: 'Review', shortLabel: 'Rev' },
];

interface IBuildStepIndicatorProps {
  currentStep: BuilderStep;
  onStepClick: (step: BuilderStep) => void;
}

export function BuilderStepIndicator({ currentStep, onStepClick }: IBuildStepIndicatorProps) {
  const isStepComplete = useBuilderStore((s) => s.isStepComplete);

  return (
    <div className="flex items-center w-full">
      {STEPS.map((config, index) => {
        const isActive = currentStep === config.step;
        const isComplete = isStepComplete(config.step);
        const isClickable = config.step <= currentStep || isComplete;

        return (
          <div key={config.step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <motion.button
                onClick={() => isClickable && onStepClick(config.step)}
                disabled={!isClickable}
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                className={`relative flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 font-bold text-sm
                  ${isActive
                    ? 'border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : isComplete
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-white/30 bg-white/10 text-white/40 cursor-not-allowed'
                  }
                  ${isClickable && !isActive ? 'cursor-pointer hover:border-purple-400' : ''}
                `}
              >
                {isComplete && !isActive ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <span className="hidden sm:block">{index + 1}</span>
                )}
                <span className="sm:hidden text-xs">{config.shortLabel}</span>
              </motion.button>

              <motion.span
                animate={{ color: isActive ? '#a855f7' : isComplete ? '#10b981' : 'rgba(255,255,255,0.4)' }}
                className="mt-1.5 text-xs font-medium hidden sm:block whitespace-nowrap"
              >
                {config.label}
              </motion.span>
            </div>

            {index < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mt-0 sm:-mt-5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentStep > config.step ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
