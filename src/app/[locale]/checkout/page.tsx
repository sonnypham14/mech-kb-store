'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CreditCard, Loader2, MapPin, PartyPopper, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/useCartStore';
import {
  ShippingFormSchema,
  PaymentFormSchema,
  type IShippingForm,
  type IPaymentForm,
} from '@/types';

type CheckoutStep = 'shipping' | 'payment' | 'success';

const STEP_CONFIG: Array<{ id: CheckoutStep; label: string; icon: React.ReactNode }> = [
  { id: 'shipping', label: 'Shipping', icon: <Truck className="h-4 w-4" /> },
  { id: 'payment', label: 'Payment', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'success', label: 'Done', icon: <Check className="h-4 w-4" /> },
];

function StepProgress({ current }: { current: CheckoutStep }) {
  const idx = STEP_CONFIG.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEP_CONFIG.map((step, i) => {
        const isActive = step.id === current;
        const isDone = i < idx;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all
                ${isActive ? 'border-purple-500 bg-purple-500 text-white' : isDone ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-white/20 text-white/30'}
              `}
            >
              {isDone ? <Check className="h-4 w-4" /> : step.icon}
            </div>
            <span
              className={`ml-2 text-sm font-medium hidden sm:block transition-colors
                ${isActive ? 'text-purple-400' : isDone ? 'text-emerald-400' : 'text-white/30'}
              `}
            >
              {step.label}
            </span>
            {i < STEP_CONFIG.length - 1 && (
              <div className="flex-1 h-0.5 mx-3 bg-white/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-500"
                  style={{ width: i < idx ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ShippingStep({ onNext }: { onNext: (data: IShippingForm) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<IShippingForm>({
    resolver: zodResolver(ShippingFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-purple-400" />
        Shipping Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {(['firstName', 'lastName'] as const).map((field) => (
          <div key={field} className="space-y-1.5">
            <Label className="text-sm text-white/70 capitalize">{field.replace(/([A-Z])/g, ' $1')}</Label>
            <Input
              {...register(field)}
              placeholder={field === 'firstName' ? 'John' : 'Doe'}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
            />
            {errors[field] && <p className="text-xs text-red-400">{errors[field]?.message}</p>}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-white/70">Email</Label>
        <Input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-white/70">Phone</Label>
        <Input
          {...register('phone')}
          placeholder="+1 555 000 0000"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
        />
        {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-white/70">Address</Label>
        <Input
          {...register('address')}
          placeholder="123 Keycap Lane"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
        />
        {errors.address && <p className="text-xs text-red-400">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">City</Label>
          <Input
            {...register('city')}
            placeholder="New York"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
          />
          {errors.city && <p className="text-xs text-red-400">{errors.city.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">ZIP Code</Label>
          <Input
            {...register('zipCode')}
            placeholder="10001"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
          />
          {errors.zipCode && <p className="text-xs text-red-400">{errors.zipCode.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">State</Label>
          <Input
            {...register('state')}
            placeholder="NY"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
          />
          {errors.state && <p className="text-xs text-red-400">{errors.state.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">Country</Label>
          <Input
            {...register('country')}
            placeholder="United States"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
          />
          {errors.country && <p className="text-xs text-red-400">{errors.country.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold">
        Continue to Payment
      </Button>
    </form>
  );
}

function PaymentStep({ onNext, isLoading }: { onNext: (data: IPaymentForm) => void; isLoading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<IPaymentForm>({
    resolver: zodResolver(PaymentFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
        <CreditCard className="h-5 w-5 text-purple-400" />
        Payment Details
      </h2>

      <div className="rounded-xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-white/10 p-4 mb-4">
        <p className="text-xs text-white/40 text-center">This is a demo store. No real payments are processed.</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-white/70">Card Number</Label>
        <Input
          {...register('cardNumber')}
          placeholder="4111 1111 1111 1111"
          maxLength={19}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 font-mono"
        />
        {errors.cardNumber && <p className="text-xs text-red-400">{errors.cardNumber.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-white/70">Cardholder Name</Label>
        <Input
          {...register('cardName')}
          placeholder="John Doe"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500"
        />
        {errors.cardName && <p className="text-xs text-red-400">{errors.cardName.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">Expiry (MM/YY)</Label>
          <Input
            {...register('expiry')}
            placeholder="12/27"
            maxLength={5}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 font-mono"
          />
          {errors.expiry && <p className="text-xs text-red-400">{errors.expiry.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">CVV</Label>
          <Input
            {...register('cvv')}
            placeholder="123"
            maxLength={4}
            type="password"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500 font-mono"
          />
          {errors.cvv && <p className="text-xs text-red-400">{errors.cvv.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing…
          </>
        ) : (
          'Place Order'
        )}
      </Button>
    </form>
  );
}

function SuccessStep({ orderNumber }: { orderNumber: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-6 py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, delay: 0.15 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
      >
        <PartyPopper className="h-10 w-10 text-white" />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-white">Order Confirmed!</h2>
        <p className="mt-2 text-white/50 text-sm max-w-xs mx-auto">
          Your order has been placed successfully. You will receive an email confirmation shortly.
        </p>
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 px-6 py-4">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Order Number</p>
        <p className="text-xl font-bold text-purple-400 font-mono">{orderNumber}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-white/40">
        <Truck className="h-4 w-4" />
        <span>Estimated delivery: 5–7 business days</span>
      </div>
    </motion.div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber] = useState(
    () => `MK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  );
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal);

  const sub = subtotal();
  const tax = sub * 0.08;
  const shipping = sub >= 150 ? 0 : 9.99;
  const total = sub + tax + shipping;

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  const handleShippingNext = (_data: IShippingForm) => {
    setStep('payment');
  };

  const handlePaymentNext = async (_data: IPaymentForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    clearCart();
    setStep('success');
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-8">
            <StepProgress current={step} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: 0.25 }}
              >
                {step === 'shipping' && <ShippingStep onNext={handleShippingNext} />}
                {step === 'payment' && <PaymentStep onNext={handlePaymentNext} isLoading={isLoading} />}
                {step === 'success' && <SuccessStep orderNumber={orderNumber} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order summary */}
          {step !== 'success' && (
            <div className="lg:w-72 shrink-0">
              <div className="rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-6 sticky top-24">
                <h3 className="text-sm font-semibold text-white/80 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>${sub.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
