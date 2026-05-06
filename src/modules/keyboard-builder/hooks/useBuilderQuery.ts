'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product-service';
import type { IBuilderCase, IBuilderPcb, IBuilderSwitch, IBuilderKeycaps } from '@/modules/keyboard-builder/types';

export function useBuilderCases() {
  return useQuery({
    queryKey: ['builder', 'cases'],
    queryFn: async () => {
      const parts = await productService.getBuilderParts('case');
      return parts as IBuilderCase[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBuilderPcbs() {
  return useQuery({
    queryKey: ['builder', 'pcbs'],
    queryFn: async () => {
      const parts = await productService.getBuilderParts('pcb');
      return parts as IBuilderPcb[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBuilderSwitches(type?: string) {
  return useQuery({
    queryKey: ['builder', 'switches', type],
    queryFn: async () => {
      const parts = await productService.getBuilderParts('switch');
      const switches = parts as IBuilderSwitch[];
      if (type && type !== 'all') {
        return switches.filter((s) => s.type === type);
      }
      return switches;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBuilderKeycaps() {
  return useQuery({
    queryKey: ['builder', 'keycaps'],
    queryFn: async () => {
      const parts = await productService.getBuilderParts('keycaps');
      return parts as IBuilderKeycaps[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
