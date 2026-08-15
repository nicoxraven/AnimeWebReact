'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader as Loader2, Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#25F4EE" d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.4c-1.2.1-2.4-.2-3.5-.7v6.6c0 3.4-2.5 5.5-5.6 5.5-3 0-5.4-2.3-5.4-5.3 0-3.1 2.6-5.2 5.6-5v2.6c-.4-.1-.8-.1-1.2 0-1.2.2-2 1.1-1.9 2.4.1 1.2 1.1 2 2.3 1.9 1.3-.1 2.1-1 2.1-2.4V3h2.6z" />
      <path fill="#FE2C55" d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.4c-1.2.1-2.4-.2-3.5-.7v6.6c0 3.4-2.5 5.5-5.6 5.5-3 0-5.4-2.3-5.4-5.3 0-3.1 2.6-5.2 5.6-5v2.6c-.4-.1-.8-.1-1.2 0-1.2.2-2 1.1-1.9 2.4.1 1.2 1.1 2 2.3 1.9 1.3-.1 2.1-1 2.1-2.4V3h2.6z" opacity="0.7" />
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
      setLoading(null);
      if (isSignup) signup(name, email || 'new@kamistream.io');
      else login(email || undefined);
    }, 600);
  }

  return (
    <Dialog open={mode !== null} onOpenChange={(o) => !o && closeAuth()}>
      <DialogContent
        showCloseButton
        className="max-w-md overflow-hidden border-border p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">
          {isSignup ? 'Create your account' : 'Sign in'}
        </DialogTitle>

        {/* Top banner */}
        <div className="relative h-28 overflow-hidden bg-aurora">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/40">
                <Sparkles className="size-5" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-7">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold">
              {isSignup ? 'Create account' : 'Welcome back'}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignup
                ? 'Join KamiStream — it\u2019s free.'
                : 'Sign in to continue watching.'}
            </p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => socialLogin('google')}
              disabled={loading !== null}
              className="h-11 gap-2.5 text-sm font-medium">
              {loading === 'google' ? <Loader2 className="size-4 animate-spin" /> : <GoogleIcon />}
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => socialLogin('tiktok')}
              disabled={loading !== null}
              className="h-11 gap-2.5 text-sm font-medium">
              {loading === 'tiktok' ? <Loader2 className="size-4 animate-spin" /> : <TikTokIcon />}
              TikTok
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or continue with email
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={submit} className="flex flex-col gap-4">
            {isSignup && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-name">Display name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="auth-name"
                    placeholder="Otaku_92"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 pl-10" />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 pl-10" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-pass">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="auth-pass"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pl-10" />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading !== null}
              className="mt-1 h-11 w-full gap-2 text-sm font-medium">
              {loading === 'email' && <Loader2 className="size-4 animate-spin" />}
              {isSignup ? 'Create account' : 'Sign in'}
              {!loading && <ArrowRight className="size-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? 'Already a member?' : "Don\u2019t have an account?"}{' '}
            <button
              type="button"
              onClick={() => openAuth(isSignup ? 'signin' : 'signup')}
              className="font-medium text-primary hover:underline">
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
