'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BuilderStep } from '@/modules/keyboard-builder/types';
import type { IBuilderCase, IBuilderPcb, IBuilderSwitch, IBuilderKeycaps } from '@/modules/keyboard-builder/types';
import { BUILDER_STORAGE_KEY } from '@/lib/constants';

interface IBuilderState {
  currentStep: BuilderStep;
  selectedCase: IBuilderCase | null;
  selectedPcb: IBuilderPcb | null;
  selectedSwitch: IBuilderSwitch | null;
  selectedKeycaps: IBuilderKeycaps | null;

  // Actions
  setStep: (step: BuilderStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCase: (item: IBuilderCase | null) => void;
  setPcb: (item: IBuilderPcb | null) => void;
  setSwitch: (item: IBuilderSwitch | null) => void;
  setKeycaps: (item: IBuilderKeycaps | null) => void;
  reset: () => void;

  // Computed
  totalPrice: () => number;
  isStepComplete: (step: BuilderStep) => boolean;
  canProceed: () => boolean;
}

const MAX_STEP = BuilderStep.Review;

export const useBuilderStore = create<IBuilderState>()(
  persist(
    (set, get) => ({
      currentStep: BuilderStep.Case,
      selectedCase: null,
      selectedPcb: null,
      selectedSwitch: null,
      selectedKeycaps: null,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < MAX_STEP) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > BuilderStep.Case) {
          set({ currentStep: currentStep - 1 });
        }
      },

      setCase: (item) => set({ selectedCase: item }),
      setPcb: (item) => set({ selectedPcb: item }),
      setSwitch: (item) => set({ selectedSwitch: item }),
      setKeycaps: (item) => set({ selectedKeycaps: item }),

      reset: () =>
        set({
          currentStep: BuilderStep.Case,
          selectedCase: null,
          selectedPcb: null,
          selectedSwitch: null,
          selectedKeycaps: null,
        }),

      totalPrice: () => {
        const { selectedCase, selectedPcb, selectedSwitch, selectedKeycaps } = get();
        return (
          (selectedCase?.price ?? 0) +
          (selectedPcb?.price ?? 0) +
          (selectedSwitch?.price ?? 0) +
          (selectedKeycaps?.price ?? 0)
        );
      },

      isStepComplete: (step: BuilderStep) => {
        const { selectedCase, selectedPcb, selectedSwitch, selectedKeycaps } = get();
        switch (step) {
          case BuilderStep.Case:
            return selectedCase !== null;
          case BuilderStep.Pcb:
            return selectedPcb !== null;
          case BuilderStep.Switch:
            return selectedSwitch !== null;
          case BuilderStep.Keycaps:
            return selectedKeycaps !== null;
          case BuilderStep.Review:
            return true;
          default:
            return false;
        }
      },

      canProceed: () => {
        const { currentStep } = get();
        return get().isStepComplete(currentStep);
      },
    }),
    {
      name: BUILDER_STORAGE_KEY,
    },
  ),
);
