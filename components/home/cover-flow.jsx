'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FreeTag, PremiumTag } from '@/components/role-badge';
import { useApp } from '@/lib/app-context';

export function CoverFlow({ items }) {
  const router = useRouter();
  const { requirePremium } = useApp();
  const [active, setActive] = useState(Math.floor(items.length / 2));
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir) => {
      setActive((prev) => (prev + dir + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 4500);
    return () => clearInterval(id);
  }, [go, paused]);

  const current = items[active];

  function play(item) {
    if (item.premium && !requirePremium(item.title)) return;
    router.push(`/watch/${item.slug}`);
  }

  return (
    <section
      className="relative overflow-hidden border-b border-border/70 bg-grid"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      
      {/* Ambient backdrop from active cover */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          key={current.id}
          src={current.cover || '/placeholder.svg'}
          alt=""
          fill
          priority
          className="scale-110 object-cover opacity-25 blur-2xl transition-all duration-700" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex size-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Trending Now
          </span>
        </div>

        {/* Cover flow stage */}
        <div className="cover-flow-perspective relative mx-auto flex h-[340px] items-center justify-center sm:h-[400px]">
          {items.map((item, i) => {
            let offset = i - active;
            // wrap for shortest path
            if (offset > items.length / 2) offset -= items.length;
            if (offset < -items.length / 2) offset += items.length;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const visible = abs <= 3;
            return (
              <button
                key={item.id}
                onClick={() => isActive ? play(item) : setActive(i)}
                aria-label={item.title}
                className={cn(
                  'absolute h-[300px] w-[210px] overflow-hidden rounded-xl border transition-all duration-500 ease-out sm:h-[360px] sm:w-[252px]',
                  isActive ?
                  'border-primary/60 shadow-2xl shadow-primary/30 ring-1 ring-primary/50' :
                  'border-border',
                  visible ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                style={{
                  transform: `translateX(${offset * 118}px) translateZ(${-abs * 160}px) rotateY(${offset * -32}deg) scale(${isActive ? 1 : 0.9})`,
                  zIndex: 20 - abs,
                  filter: isActive ? 'none' : 'brightness(0.5)'
                }}>
                
                <Image
                  src={item.cover || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="252px" />
                
                <div className="absolute left-2 top-2">
                  {item.premium ? <PremiumTag /> : <FreeTag />}
                </div>
                {isActive &&
                <div className="absolute inset-x-0 bottom-0 grid place-items-center bg-gradient-to-t from-background/90 to-transparent p-4 pt-10">
                    <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
                      <Play className="size-5 fill-current" />
                    </span>
                  </div>
                }
              </button>);

          })}

          {/* Nav arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-0 z-30 grid size-10 place-items-center rounded-full border border-border bg-card/80 backdrop-blur transition-colors hover:bg-secondary sm:left-4">
            
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-0 z-30 grid size-10 place-items-center rounded-full border border-border bg-card/80 backdrop-blur transition-colors hover:bg-secondary sm:right-4">
            
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Active details */}
        <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {current.genres.map((g) =>
            <span
              key={g}
              className="rounded-full border border-border bg-card/60 px-2.5 py-0.5 text-xs text-muted-foreground">
              
                {g}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-glow-primary sm:text-5xl">
            {current.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-chart-4">
              <Star className="size-4 fill-current" />
              {current.rating.toFixed(1)}
            </span>
            <span>{current.year}</span>
            <span>·</span>
            <span>{current.studio}</span>
            <span>·</span>
            <span className="capitalize">{current.type}</span>
          </div>
          <p className="mt-3 line-clamp-2 text-pretty text-muted-foreground">
            {current.synopsis}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Button size="lg" onClick={() => play(current)} className="gap-2">
              <Play className="size-4 fill-current" />
              {current.type === 'movie' ? 'Watch now' : 'Read now'}
            </Button>
            <div className="flex gap-1.5">
              {items.map((_, i) =>
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === active ?
                  'w-6 bg-primary' :
                  'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground'
                )} />

              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}