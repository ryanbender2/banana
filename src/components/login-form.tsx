'use client';

import icon from '@/assets/icon.png';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { IconBrandDiscord } from '@tabler/icons-react';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BackgroundGradientAnimation } from './ui/background-gradient-animation';
import ColourfulText from './ui/colourful-text';
import { HoverBorderGradient } from './ui/hover-border-gradient';

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-8 px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl">
        <Image src={icon} alt="Banana" className="aspect-square w-13" />
        <p className="bg-linear-to-b from-white/90 to-white/30 bg-clip-text text-transparent drop-shadow-2xl">
          Welcome to <ColourfulText text="Banana" className="underline" />
        </p>
        <HoverBorderGradient
          containerClassName="pointer-events-auto text-lg hover:scale-105 active:scale-95"
          className="flex items-center gap-1"
          onClick={handleSocialLogin}
        >
          Continue with Discord <IconBrandDiscord />
        </HoverBorderGradient>
        <Alert
          variant="destructive"
          className={cn('w-min', error ? 'block' : 'hidden')}
        >
          <AlertCircle />
          <AlertTitle>Uh oh!</AlertTitle>
          <AlertDescription className="min-w-50">{error}</AlertDescription>
        </Alert>
      </div>
    </BackgroundGradientAnimation>
  );
};
