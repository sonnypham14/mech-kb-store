'use client';

import { motion } from 'framer-motion';
import { SoundPlayer } from '@/modules/sound-lab/components/SoundPlayer';
import { Headphones } from 'lucide-react';

interface ISwitchSample {
  id: string;
  name: string;
  type: 'linear' | 'tactile' | 'clicky';
  description: string;
}

const SWITCH_SAMPLES: ISwitchSample[] = [
  {
    id: 'ss-1',
    name: 'Gateron Yellow Pro',
    type: 'linear',
    description: 'Ultra-smooth linear with factory lube. Perfect for fast typing.',
  },
  {
    id: 'ss-2',
    name: 'Holy Pandas',
    type: 'tactile',
    description: 'The legendary tactile — defined by its iconic round bump.',
  },
  {
    id: 'ss-3',
    name: 'Kailh Box White',
    type: 'clicky',
    description: 'Satisfying click bar mechanism with IP56 dust resistance.',
  },
  {
    id: 'ss-4',
    name: 'Alpaca Linear V2',
    type: 'linear',
    description: 'Smooth nylon housing with a medium 62g spring weight.',
  },
  {
    id: 'ss-5',
    name: 'Boba U4T',
    type: 'tactile',
    description: 'Thocky tactile with a distinct bump and quiet character.',
  },
  {
    id: 'ss-6',
    name: 'Cherry MX Blue',
    type: 'clicky',
    description: 'The iconic clicky switch that put MKB on the map.',
  },
  {
    id: 'ss-7',
    name: 'NK Cream',
    type: 'linear',
    description: 'All-nylon construction creates the signature creamy sound.',
  },
  {
    id: 'ss-8',
    name: 'Durock T1',
    type: 'tactile',
    description: 'Sharp tactile bump with a quiet, thocky sound signature.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function SoundLabGrid() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center gap-3"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
          <Headphones className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Switch Sound Lab</h1>
        <p className="text-white/60 max-w-xl text-sm leading-relaxed">
          Preview how different switch types sound before committing to a build.
          Play each switch to hear its unique acoustic signature.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {SWITCH_SAMPLES.map((sample) => (
          <motion.div key={sample.id} variants={itemVariants} className="flex flex-col gap-2">
            <SoundPlayer
              switchName={sample.name}
              switchType={sample.type}
            />
            <p className="text-xs text-white/40 px-1 leading-relaxed">{sample.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
