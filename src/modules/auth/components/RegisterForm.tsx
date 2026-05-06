'use client';

import { useState } from 'react';
import { Link } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RegisterFormSchema, type IRegisterForm } from '@/types';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: IRegisterForm) => {
    setIsLoading(true);
    console.log('Register attempt:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({
      title: 'Account created!',
      description: 'Welcome to MechKeys. You can now sign in.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-md rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-8 shadow-2xl"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
        <p className="mt-1 text-sm text-white/50">Join the MechKeys community today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-sm text-white/70">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              autoComplete="given-name"
              {...register('firstName')}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 focus:ring-purple-500/20"
            />
            {errors.firstName && (
              <p className="text-xs text-red-400">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-sm text-white/70">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              {...register('lastName')}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 focus:ring-purple-500/20"
            />
            {errors.lastName && (
              <p className="text-xs text-red-400">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm text-white/70">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 focus:ring-purple-500/20"
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm text-white/70">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              {...register('password')}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm text-white/70">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              autoComplete="new-password"
              {...register('confirmPassword')}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/40">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
