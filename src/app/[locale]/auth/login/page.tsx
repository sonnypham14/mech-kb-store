import { LoginForm } from '@/modules/auth/components/LoginForm';

export const metadata = {
  title: 'Sign In | MechKeys',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      <LoginForm />
    </main>
  );
}
