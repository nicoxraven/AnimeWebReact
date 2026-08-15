'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock, Lock } from 'lucide-react';

import { useApp } from '@/lib/app-context';
import { FreeTag, PremiumTag } from '@/components/role-badge';

export function NewsCard({ article }) {
  const router = useRouter();
  const { requirePremium } = useApp();

  function open() {
    if (article.premium && !requirePremium(article.title)) return;
    router.push(`/news/${article.id}`);
  }

  return (
    <button
      onClick={open}
      className="group flex gap-4 overflow-hidden rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/50">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg sm:size-28">
        <Image
          src={article.cover || '/placeholder.svg'}
          alt={article.title}
          fill
          sizes="112px"
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {article.premium && (
          <div className="absolute inset-0 grid place-items-center bg-background/50 backdrop-blur-[2px]">
            <Lock className="size-5 text-primary" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 py-1">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            {article.category}
          </span>
          {article.premium ? <PremiumTag /> : <FreeTag />}
        </div>
        <h3 className="line-clamp-2 font-medium leading-snug text-pretty group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </button>
  );
}
