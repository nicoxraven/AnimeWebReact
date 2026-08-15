'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, Sparkles, Star } from 'lucide-react';

import { media } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { FreeTag, PremiumTag } from '@/components/role-badge';
import { MediaViewer } from '@/components/watch/media-viewer';
import { DiscussionPanel } from '@/components/watch/discussion-panel';
import { MediaCard } from '@/components/media-card';

export function WatchView({ item }) {
  const { canAccessPremium, openKPay, currentUser, openAuth } = useApp();
  const locked = item.premium && !canAccessPremium;

  const related = media.
  filter((m) => m.type === item.type && m.id !== item.id).
  slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        
        <ArrowLeft className="size-4" />
        Back to browse
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main media column */}
        <div className="space-y-5">
          {locked ?
          <LockedPanel
            item={item}
            onUnlock={() => currentUser ? openKPay() : openAuth('signin')} /> :


          <MediaViewer item={item} />
          }

          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  {item.premium ? <PremiumTag /> : <FreeTag />}
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium capitalize">
                    {item.type}
                  </span>
                </div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-balance">
                  {item.title}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1 text-chart-4">
                    <Star className="size-4 fill-current" />
                    {item.rating.toFixed(1)}
                  </span>
                  <span>·</span>
                  <span>{item.year}</span>
                  <span>·</span>
                  <span>{item.studio}</span>
                  <span>·</span>
                  <span>
                    {item.type === 'movie' ?
                    item.duration :
                    `${item.chapters} chapters`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.genres.map((g) =>
              <span
                key={g}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                
                  {g}
                </span>
              )}
            </div>

            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
              {item.synopsis}
            </p>
          </div>

          {/* Related */}
          <div className="pt-2">
            <h2 className="mb-3 font-display text-lg font-semibold">
              More {item.type === 'movie' ? 'movies' : 'manga'}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((m) =>
              <MediaCard key={m.id} item={m} />
              )}
            </div>
          </div>
        </div>

        {/* Discussion column */}
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
          <div className="h-full overflow-hidden rounded-xl border border-border bg-card">
            <DiscussionPanel />
          </div>
        </aside>
      </div>
    </div>);

}

function LockedPanel({
  item,
  onUnlock



}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      <div
        className="aspect-video bg-cover bg-center blur-xl saturate-150"
        style={{ backgroundImage: `url(${item.cover})` }} />
      
      <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
        <div className="max-w-sm px-6 text-center">
          <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
            <Lock className="size-6" />
          </span>
          <h2 className="font-display text-xl font-bold">Premium title</h2>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
            {item.title} is part of KamiStream Premium. Unlock the full library
            of movies, manga, and subscriber-only extras.
          </p>
          <Button onClick={onUnlock} className="mt-4 gap-1.5">
            <Sparkles className="size-4" />
            Unlock with Premium
          </Button>
        </div>
      </div>
    </div>);

}