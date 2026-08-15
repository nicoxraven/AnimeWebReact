'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BookOpen, Lock, Play, Star, Tv } from 'lucide-react';

import { useApp } from '@/lib/app-context';
import { FreeTag, PremiumTag } from '@/components/role-badge';

export function MediaCard({ item }) {
  const router = useRouter();
  const { requirePremium } = useApp();

  function open() {
    if (item.premium && !requirePremium(item.title)) return;
    router.push(`/watch/${item.slug}`);
  }

  const Icon = item.type === 'movie' ? Play : item.type === 'series' ? Tv : BookOpen;

  return (
    <button
      onClick={open}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={item.cover || '/placeholder.svg'}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 22vw, 180px"
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-1.5 top-1.5">
          {item.premium ? <PremiumTag /> : <FreeTag />}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
            {item.premium ? <Lock className="size-4" /> : <Icon className="size-4 fill-current" />}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-2.5">
        <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 text-chart-4">
            <Star className="size-3 fill-current" />
            {item.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{item.year}</span>
          <span>·</span>
          <span>
            {item.type === 'movie'
              ? item.duration
              : item.type === 'series'
              ? `${item.episodes} eps`
              : `${item.chapters} ch`}
          </span>
        </div>
      </div>
    </button>
  );
}
