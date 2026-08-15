'use client';

import { useMemo, useState } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  Loader2,
  Lock,
  Smartphone,
  Sparkles } from
'lucide-react';
import { useApp } from '@/lib/app-context';
import { PLAN_PRICING } from '@/lib/mock-data';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



// Deterministic pseudo-QR pattern from a seed string.
function useQrCells(seed, size = 21) {
  return useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const cells = [];
    let state = h >>> 0;
    for (let i = 0; i < size * size; i++) {
      state = Math.imul(state, 1103515245) + 12345 >>> 0;
      cells.push((state & 0xff) > 128);
    }
    return cells;
  }, [seed, size]);
}

function QrCode({ seed }) {
  const size = 21;
  const cells = useQrCells(seed, size);
  const isFinder = (r, c) => {
    const inBox = (br, bc) =>
    r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };
  return (
    <div className="rounded-xl bg-white p-3 shadow-lg">
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        
        {cells.map((on, i) => {
          const r = Math.floor(i / size);
          const c = i % size;
          const finder = isFinder(r, c);
          return (
            <div
              key={i}
              className={cn(
                'aspect-square',
                finder || on ? 'bg-[#141019]' : 'bg-white'
              )} />);


        })}
      </div>
    </div>);

}

export function KPayModal() {
  const { kpayOpen, closeKPay, activateSubscription, currentUser, openAuth } =
  useApp();
  const [plan, setPlan] = useState('yearly');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');

  const seed = `KPAY|${phone || 'guest'}|${plan}|${PLAN_PRICING[plan].price}`;
  const phoneValid = /^[0-9\s-]{7,}$/.test(phone);

  function reset() {
    setStatus('idle');
  }

  function startPayment() {
    if (!phoneValid) return;
    setStatus('pending');
    // Simulate KPay confirming the transaction
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        activateSubscription(plan, phone);
        setStatus('idle');
      }, 1400);
    }, 2600);
  }

  return (
    <Dialog
      open={kpayOpen}
      onOpenChange={(o) => {
        if (!o) {
          closeKPay();
          reset();
        }
      }}>
      
      <DialogContent className="max-w-lg border-border">
        <DialogTitle className="flex items-center gap-2 font-display text-xl">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          Unlock KamiStream Premium
        </DialogTitle>

        {!currentUser ?
        <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-secondary">
              <Lock className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Sign in to subscribe</p>
              <p className="text-sm text-muted-foreground">
                You need an account to activate a KPay subscription.
              </p>
            </div>
            <Button
            onClick={() => {
              closeKPay();
              openAuth('signin');
            }}>
            
              Sign in to continue
            </Button>
          </div> :
        status === 'idle' ?
        <div className="flex flex-col gap-5">
            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(PLAN_PRICING).map((p) => {
              const info = PLAN_PRICING[p];
              const active = plan === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={cn(
                    'relative rounded-xl border p-4 text-left transition-all',
                    active ?
                    'border-primary bg-primary/10 ring-1 ring-primary' :
                    'border-border bg-card hover:border-primary/40'
                  )}>
                  
                    {p === 'yearly' &&
                  <span className="absolute -top-2 right-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                        BEST VALUE
                      </span>
                  }
                    <p className="text-sm font-medium">{info.label}</p>
                    <p className="mt-1 font-display text-xl font-bold">
                      {info.price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">
                        {' '}
                        Ks{info.per}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {info.note}
                    </p>
                  </button>);

            })}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kpay-phone">KPay phone number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                id="kpay-phone"
                inputMode="tel"
                placeholder="09-7712-4408"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-9" />
              
              </div>
            </div>

            <Button
            onClick={startPayment}
            disabled={!phoneValid}
            className="w-full"
            size="lg">
            
              Generate KPay QR · {PLAN_PRICING[plan].price.toLocaleString()} Ks
            </Button>
            <p className="-mt-2 text-center text-xs text-muted-foreground">
              Simulated checkout — no real payment is processed.
            </p>
          </div> :

        <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative">
              <QrCode seed={seed} />
              {status === 'success' &&
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-background/85 backdrop-blur-sm">
                  <CheckCircle2 className="size-16 text-accent" />
                </div>
            }
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Scan with KPay · {phone}
              </p>
              <p className="font-display text-lg font-bold">
                {PLAN_PRICING[plan].price.toLocaleString()} Ks ·{' '}
                {PLAN_PRICING[plan].label}
              </p>
            </div>

            {/* Status indicator */}
            <div
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
              status === 'pending' ?
              'border-chart-4/40 bg-chart-4/10 text-chart-4' :
              'border-accent/40 bg-accent/10 text-accent'
            )}>
            
              {status === 'pending' ?
            <>
                  <Loader2 className="size-4 animate-spin" />
                  Waiting for payment confirmation…
                </> :

            <>
                  <BadgeCheck className="size-4" />
                  Payment successful! Unlocking premium…
                </>
            }
            </div>

            {status === 'pending' &&
          <Button variant="ghost" size="sm" onClick={reset}>
                Cancel
              </Button>
          }
          </div>
        }
      </DialogContent>
    </Dialog>);

}