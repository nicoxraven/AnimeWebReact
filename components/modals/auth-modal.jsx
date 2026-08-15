'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 2.9 14.7 2 12 2 6.9 2 2.8 6.1 2.8 11.9S6.9 21.8 12 21.8c5.9 0 9.8-4.1 9.8-9.9 0-.7-.1-1.2-.2-1.7H12z" />
      
    </svg>);

}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
    </svg>);

}

export function AuthModal() {
  const { authModal, closeAuth, login, signup, openAuth } = useApp();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mode = authModal;
  const isSignup = mode === 'signup';

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isSignup) signup(name, email || 'new@kamistream.io');else
      login(email || undefined);
    }, 700);
  }

  return (
    <Dialog open={mode !== null} onOpenChange={(o) => !o && closeAuth()}>
      <DialogContent
        showCloseButton
        className="max-w-3xl overflow-hidden border-border p-0 sm:rounded-2xl">
        
        <DialogTitle className="sr-only">
          {isSignup ? 'Create your account' : 'Sign in'}
        </DialogTitle>
        <div className="grid md:grid-cols-2">
          {/* Anime side visual */}
          <div className="relative hidden min-h-[520px] md:block">
            <Image
              src="/anime/cover-celestial.png"
              alt=""
              fill
              className="object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                <Sparkles className="size-3.5" />
                KamiStream Premium
              </span>
              <p className="mt-3 font-display text-2xl font-bold leading-tight text-balance">
                Your gateway to endless anime worlds.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Stream movies, read manga, and join the talk.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
            <div>
              <h2 className="font-display text-2xl font-bold">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isSignup ?
                'Join the community in seconds.' :
                'Sign in to continue watching.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => login()}
                className="gap-2">
                
                <GoogleIcon />
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => login()}
                className="gap-2">
                
                <GithubIcon />
                GitHub
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              {isSignup &&
              <div className="flex flex-col gap-1.5">
                  <Label htmlFor="auth-name">Display name</Label>
                  <Input
                  id="auth-name"
                  placeholder="Otaku_92"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
                
                </div>
              }
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-email">Email</Label>
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-pass">Password</Label>
                <Input
                  id="auth-pass"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                
              </div>
              <Button type="submit" disabled={loading} className="mt-1 w-full">
                {loading && <Loader2 className="size-4 animate-spin" />}
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
    </Dialog>);

}