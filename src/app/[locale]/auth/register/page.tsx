import { RegisterForm } from '@/modules/auth/components/RegisterForm';

export const metadata = {
  title: 'Create Account | MechKeys',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      <RegisterForm />
    </main>
  );
}
