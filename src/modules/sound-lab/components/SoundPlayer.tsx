'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ISoundPlayerProps {
  switchName: string;
  switchType: 'linear' | 'tactile' | 'clicky';
  audioSrc?: string;
}

const TYPE_COLORS: Record<ISoundPlayerProps['switchType'], string> = {
  linear: 'from-red-500 to-orange-500',
  tactile: 'from-yellow-500 to-amber-500',
  clicky: 'from-blue-500 to-cyan-500',
};

const TYPE_LABELS: Record<ISoundPlayerProps['switchType'], string> = {
  linear: 'Linear',
  tactile: 'Tactile',
  clicky: 'Clicky',
};

const BAR_HEIGHTS = [40, 70, 55, 85, 45];

export function SoundPlayer({ switchName, switchType, audioSrc: _audioSrc }: ISoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const colorGradient = TYPE_COLORS[switchType];
  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className="rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{switchName}</h3>
          <span
            className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-gradient-to-r ${colorGradient} text-white`}
          >
            {TYPE_LABELS[switchType]}
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex items-center justify-center gap-1 h-12">
        {BAR_HEIGHTS.map((maxH, i) => (
          <motion.div
            key={i}
            className={`w-2 rounded-full bg-gradient-to-t ${colorGradient}`}
            animate={
              isPlaying
                ? {
                    height: [
                      `${maxH * 0.3}%`,
                      `${maxH}%`,
                      `${maxH * 0.5}%`,
                      `${maxH * 0.9}%`,
                      `${maxH * 0.3}%`,
                    ],
                    opacity: 1,
                  }
                : { height: '20%', opacity: 0.4 }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8 + i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.12,
                  }
                : { duration: 0.3 }
            }
            style={{ height: '20%' }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setIsPlaying((prev) => !prev)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${colorGradient} text-white shadow-md transition-shadow hover:shadow-lg`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Pause className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Play className="h-4 w-4 ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="text-white/40 hover:text-white transition-colors shrink-0"
        >
          {displayVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={displayVolume}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setVolume(val);
            if (isMuted && val > 0) setIsMuted(false);
          }}
          className="flex-1 h-1.5 appearance-none rounded-full bg-white/20 accent-purple-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
