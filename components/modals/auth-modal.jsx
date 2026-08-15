'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader as Loader2, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 2.9 14.7 2 12 2 6.9 2 2.8 6.1 2.8 11.9S6.9 21.8 12 21.8c5.9 0 9.8-4.1 9.8-9.9 0-.7-.1-1.2-.2-1.7H12z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#25F4EE"
        d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.4c-1.2.1-2.4-.2-3.5-.7v6.6c0 3.4-2.5 5.5-5.6 5.5-3 0-5.4-2.3-5.4-5.3 0-3.1 2.6-5.2 5.6-5v2.6c-.4-.1-.8-.1-1.2 0-1.2.2-2 1.1-1.9 2.4.1 1.2 1.1 2 2.3 1.9 1.3-.1 2.1-1 2.1-2.4V3h2.6z" />
      <path
        fill="#FE2C55"
        d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.4c-1.2.1-2.4-.2-3.5-.7v6.6c0 3.4-2.5 5.5-5.6 5.5-3 0-5.4-2.3-5.4-5.3 0-3.1 2.6-5.2 5.6-5v2.6c-.4-.1-.8-.1-1.2 0-1.2.2-2 1.1-1.9 2.4.1 1.2 1.1 2 2.3 1.9 1.3-.1 2.1-1 2.1-2.4V3h2.6z"
        opacity="0.7" />
    </svg>
  );
}

export function AuthModal() {
  const { authModal, closeAuth, login, signup, openAuth } = useApp();
  const [loading, setLoading] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mode = authModal;
  const isSignup = mode === 'signup';

  function socialLogin(provider) {
    setLoading(provider);
    setTimeout(() => {
      setLoading(null);
      login();
    }, 800);
  }

  function submit(e) {
    e.preventDefault();
    setLoading('email');
    setTimeout(() => {
      setLoading(false);
      if (isSignup) signup(name, email || 'new@kamistream.io');
      else login(email || undefined);
    }, 700);
  }

  return (
    <Dialog open={mode !== null} onOpenChange={(o) => !o && closeAuth()}>
      <DialogContent
        showCloseButton
        className="max-w-4xl overflow-hidden border-border p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">
          {isSignup ? 'Create your account' : 'Sign in'}
        </DialogTitle>
        <div className="grid md:grid-cols-2">
          <div className="relative hidden min-h-[600px] md:block">
            <Image
              src="/anime/cover-celestial.png"
              alt=""
              fill
              className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/70" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                <Sparkles className="size-3.5" />
                KamiStream Premium
              </span>
              <p className="mt-4 font-display text-3xl font-bold leading-tight text-balance">
                Your gateway to endless anime worlds.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Stream movies, read manga, and stay ahead of every release.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
            <div>
              <h2 className="font-display text-3xl font-bold">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {isSignup
                  ? 'Join the community in seconds — it&apos;s free.'
                  : 'Sign in to continue watching and reading.'}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => socialLogin('google')}
                disabled={loading !== null}
                className="h-11 gap-3 text-sm font-medium">
                {loading === 'google' ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => socialLogin('tiktok')}
                disabled={loading !== null}
                className="h-11 gap-3 text-sm font-medium">
                {loading === 'tiktok' ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <TikTokIcon />
                )}
                Continue with TikTok
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              {isSignup && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="auth-name">Display name</Label>
                  <Input
                    id="auth-name"
                    placeholder="Otaku_92"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-email">Email</Label>
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-pass">Password</Label>
                <Input
                  id="auth-pass"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11" />
              </div>
              <Button
                type="submit"
                disabled={loading !== null}
                className="mt-1 h-11 w-full text-sm font-medium">
                {loading === 'email' && <Loader2 className="size-4 animate-spin" />}
                {isSignup ? 'Create account' : 'Sign in'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {isSignup ? 'Already a member?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => openAuth(isSignup ? 'signin' : 'signup')}
                className="font-medium text-primary hover:underline">
                {isSignup ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
