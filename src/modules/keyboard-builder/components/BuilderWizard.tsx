'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BuilderStepIndicator } from '@/modules/keyboard-builder/components/BuilderStepIndicator';
import { BuilderPriceSummary } from '@/modules/keyboard-builder/components/BuilderPriceSummary';
import { CaseStep } from '@/modules/keyboard-builder/components/steps/CaseStep';
import { PcbStep } from '@/modules/keyboard-builder/components/steps/PcbStep';
import { SwitchStep } from '@/modules/keyboard-builder/components/steps/SwitchStep';
import { KeycapsStep } from '@/modules/keyboard-builder/components/steps/KeycapsStep';
import { ReviewStep } from '@/modules/keyboard-builder/components/steps/ReviewStep';
import { useBuilderStore } from '@/store/useBuilderStore';
import { BuilderStep } from '@/modules/keyboard-builder/types';

const STEP_LABELS: Record<BuilderStep, string> = {
  [BuilderStep.Case]: 'Case',
  [BuilderStep.Pcb]: 'PCB',
  [BuilderStep.Switch]: 'Switch',
  [BuilderStep.Keycaps]: 'Keycaps',
  [BuilderStep.Review]: 'Review',
};

function StepContent({ step }: { step: BuilderStep }) {
  switch (step) {
    case BuilderStep.Case:
      return <CaseStep />;
    case BuilderStep.Pcb:
      return <PcbStep />;
    case BuilderStep.Switch:
      return <SwitchStep />;
    case BuilderStep.Keycaps:
      return <KeycapsStep />;
    case BuilderStep.Review:
      return <ReviewStep />;
  }
}

export function BuilderWizard() {
  const currentStep = useBuilderStore((s) => s.currentStep);
  const setStep = useBuilderStore((s) => s.setStep);
  const nextStep = useBuilderStore((s) => s.nextStep);
  const prevStep = useBuilderStore((s) => s.prevStep);
  const canProceed = useBuilderStore((s) => s.canProceed);
  const [prevStepValue, setPrevStepValue] = useState(currentStep);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const direction = currentStep > prevStepValue ? 1 : -1;

  const handleNext = () => {
    setPrevStepValue(currentStep);
    nextStep();
  };

  const handlePrev = () => {
    setPrevStepValue(currentStep);
    prevStep();
  };

  const handleStepClick = (step: BuilderStep) => {
    setPrevStepValue(currentStep);
    setStep(step);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const isLastStep = currentStep === BuilderStep.Review;
  const isFirstStep = currentStep === BuilderStep.Case;
  const proceed = canProceed();

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
      {/* Main content */}
      <div className="flex-1 flex flex-col rounded-2xl bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 p-6">
        {/* Step Indicator */}
        <div className="mb-8">
          <BuilderStepIndicator currentStep={currentStep} onStepClick={handleStepClick} />
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="w-full"
            >
              <StepContent step={currentStep} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={isFirstStep}
            className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {isFirstStep ? 'Start' : STEP_LABELS[currentStep - 1 as BuilderStep]}
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'w-4 bg-purple-500' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          {!isLastStep && (
            <Button
              onClick={handleNext}
              disabled={!proceed}
              className={`transition-all ${
                proceed
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {STEP_LABELS[currentStep + 1 as BuilderStep]}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}

          {isLastStep && <div className="w-24" />}
        </div>
      </div>

      {/* Mobile summary toggle */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={() => setSummaryOpen((prev) => !prev)}
          className="w-full text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
        >
          {summaryOpen ? (
            <>
              <PanelRightClose className="h-4 w-4 mr-2" />
              Hide Summary
            </>
          ) : (
            <>
              <PanelRightOpen className="h-4 w-4 mr-2" />
              Show Build Summary
            </>
          )}
        </Button>
        <AnimatePresence>
          {summaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-3"
            >
              <BuilderPriceSummary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24">
          <BuilderPriceSummary />
        </div>
      </div>
    </div>
  );
}
