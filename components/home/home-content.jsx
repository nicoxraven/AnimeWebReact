'use client';

import {
  BookOpen,
  Film,
  Newspaper,
  Tv } from
'lucide-react';
import { media, news } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MediaCard } from '@/components/media-card';
import { NewsCard } from '@/components/news-card';

const movies = media.filter((m) => m.type === 'movie');
const series = media.filter((m) => m.type === 'series');
const manga = media.filter((m) => m.type === 'manga');

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function HomeContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Tabs defaultValue="movies" className="gap-8">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-card p-1.5">
          <TabsTrigger value="movies" className="gap-1.5">
            <Film className="size-4" />
            Movies
          </TabsTrigger>
          <TabsTrigger value="series" className="gap-1.5">
            <Tv className="size-4" />
            Series
          </TabsTrigger>
          <TabsTrigger value="manga" className="gap-1.5">
            <BookOpen className="size-4" />
            Manga
          </TabsTrigger>
          <TabsTrigger value="news" className="gap-1.5">
            <Newspaper className="size-4" />
            News
          </TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          <SectionHeading
            title="Anime Movies"
            subtitle="Stream cinematic features — free and premium." />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {movies.map((m) => (
              <MediaCard key={m.id} item={m} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="series">
          <SectionHeading
            title="Anime Series"
            subtitle="Binge full series — episode by episode." />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {series.map((s) => (
              <MediaCard key={s.id} item={s} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manga">
          <SectionHeading
            title="Manga Reader"
            subtitle="Dive into chapters from your favorite series." />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {manga.map((m) => (
              <MediaCard key={m.id} item={m} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="news">
          <SectionHeading
            title="Anime News"
            subtitle="The latest announcements, interviews, and charts." />
          <div className="grid gap-4 md:grid-cols-2">
            {news.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
