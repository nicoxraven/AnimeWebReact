'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BookOpen, Lock, Play, Star } from 'lucide-react';

import { useApp } from '@/lib/app-context';
import { FreeTag, PremiumTag } from '@/components/role-badge';

export function MediaCard({ item }) {
  const router = useRouter();
  const { requirePremium } = useApp();

  function open() {
    if (item.premium && !requirePremium(item.title)) return;
    router.push(`/watch/${item.slug}`);
  }

  return (
    <button
      onClick={open}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
      
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={item.cover || '/placeholder.svg'}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
        
        <div className="absolute left-2 top-2">
          {item.premium ? <PremiumTag /> : <FreeTag />}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
            {item.premium ?
            <Lock className="size-5" /> :
            item.type === 'movie' ?
            <Play className="size-5 fill-current" /> :

            <BookOpen className="size-5" />
            }
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-1 font-medium">{item.title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 text-chart-4">
            <Star className="size-3 fill-current" />
            {item.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{item.year}</span>
          <span>·</span>
          <span>
            {item.type === 'movie' ?
            item.duration :
            `${item.chapters} ch`}
          </span>
        </div>
      </div>
    </button>);

}