'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  BookOpen,
  List } from
'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function MediaViewer({ item }) {
  if (item.type === 'movie') return <MoviePlayer item={item} />;
  return <MangaReader item={item} />;
}

function MoviePlayer({ item }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-video">
        <Image
          src={item.cover || '/placeholder.svg'}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40" />

        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 grid place-items-center"
          aria-label={playing ? 'Pause' : 'Play'}>
          <span
            className={cn(
              'grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-transform',
              playing ? 'scale-90 opacity-0' : 'scale-100 hover:scale-110'
            )}>
            <Play className="size-7 fill-current" />
          </span>
        </button>

        <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
          <div className="group h-1.5 w-full cursor-pointer rounded-full bg-white/20">
            <div
              className="relative h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}>
              <span className="absolute -right-1.5 top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow transition-opacity group-hover:opacity-100" />
            </div>
          </div>
          <div className="flex items-center gap-3 text-white">
            <button onClick={() => setPlaying((p) => !p)} aria-label="Play/pause">
              {playing ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
            </button>
            <button aria-label="Skip back" onClick={() => setProgress((p) => Math.max(0, p - 5))}>
              <SkipBack className="size-4" />
            </button>
            <button aria-label="Skip forward" onClick={() => setProgress((p) => Math.min(100, p + 5))}>
              <SkipForward className="size-4" />
            </button>
            <Volume2 className="size-4" />
            <span className="text-xs tabular-nums text-white/80">
              {formatTime(progress, item.duration)} / {item.duration}
            </span>
            <div className="ml-auto flex items-center gap-3">
              <Settings className="size-4" />
              <Maximize2 className="size-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border p-4">
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium">
          HD 1080p
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium">
          Sub · Dub
        </span>
        <span className="text-sm text-muted-foreground">
          {item.studio} · {item.year}
        </span>
      </div>
    </div>
  );
}

function MangaReader({ item }) {
  const total = item.chapters ?? 1;
  const [chapter, setChapter] = useState(1);
  const [page, setPage] = useState(1);
  const [showPages, setShowPages] = useState(false);
  const pagesPerChapter = 8;

  function nextPage() {
    if (page < pagesPerChapter) {
      setPage((p) => p + 1);
    } else if (chapter < total) {
      setChapter((c) => c + 1);
      setPage(1);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((p) => p - 1);
    } else if (chapter > 1) {
      setChapter((c) => c - 1);
      setPage(pagesPerChapter);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border p-3">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (chapter > 1) {
                setChapter((c) => c - 1);
                setPage(1);
              }
            }}
            disabled={chapter <= 1}>
            <ChevronLeft className="size-4" />
            Prev ch
          </Button>
          <span className="text-sm font-medium">
            Chapter {chapter}
            <span className="text-muted-foreground"> / {total}</span>
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (chapter < total) {
                setChapter((c) => c + 1);
                setPage(1);
              }
            }}
            disabled={chapter >= total}>
            Next ch
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {page} / {pagesPerChapter}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowPages((s) => !s)}
            aria-label="Toggle page list">
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {showPages && (
        <div className="flex gap-2 overflow-x-auto border-b border-border p-3 scrollbar-none">
          {Array.from({ length: pagesPerChapter }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                'grid size-12 shrink-0 place-items-center rounded-lg border text-xs font-medium transition-colors',
                i + 1 === page
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
              )}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[3/4] bg-black/40 sm:aspect-[4/3]">
        <Image
          src={item.cover || '/placeholder.svg'}
          alt={`${item.title} — chapter ${chapter}, page ${page}`}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-contain"
          priority />
        <button
          onClick={prevPage}
          className="absolute inset-y-0 left-0 w-1/3 group"
          aria-label="Previous page">
          <div className="flex h-full items-center justify-start pl-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="grid size-10 place-items-center rounded-full bg-background/80 backdrop-blur">
              <ChevronLeft className="size-5" />
            </span>
          </div>
        </button>
        <button
          onClick={nextPage}
          className="absolute inset-y-0 right-0 w-1/3 group"
          aria-label="Next page">
          <div className="flex h-full items-center justify-end pr-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="grid size-10 place-items-center rounded-full bg-background/80 backdrop-blur">
              <ChevronRight className="size-5" />
            </span>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1 border-t border-border p-3">
        {Array.from({ length: pagesPerChapter }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i + 1 <= page ? 'bg-primary' : 'bg-secondary hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to page ${i + 1}`} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border p-3">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={chapter <= 1 && page <= 1}
          className="gap-1.5">
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen className="size-3.5" />
          {item.title} · Ch {chapter}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={chapter >= total && page >= pagesPerChapter}
          className="gap-1.5">
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function formatTime(progress, duration) {
  if (!duration) return '0:00';
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  let totalMin = 0;
  if (match) {
    totalMin = parseInt(match[1]) * 60 + (parseInt(match[2] || '0') || 0);
  }
  const elapsed = Math.round((progress / 100) * totalMin);
  const h = Math.floor(elapsed / 60);
  const m = elapsed % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}` : `0:${String(m).padStart(2, '0')}`;
}
