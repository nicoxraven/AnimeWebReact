'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Film,
  MessagesSquare,
  Newspaper } from
'lucide-react';
import { forumPosts, media, news } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/media-card';
import { NewsCard } from '@/components/news-card';
import { ForumPostCard } from '@/components/forum-post-card';

const movies = media.filter((m) => m.type === 'movie');
const manga = media.filter((m) => m.type === 'manga');

function SectionHeading({
  title,
  subtitle



}) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>);

}

export function HomeContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Tabs defaultValue="movies" className="gap-8">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-card p-1.5">
          <TabsTrigger value="movies" className="gap-1.5">
            <Film className="size-4" />
            Anime Movies
          </TabsTrigger>
          <TabsTrigger value="manga" className="gap-1.5">
            <BookOpen className="size-4" />
            Manga Reader
          </TabsTrigger>
          <TabsTrigger value="news" className="gap-1.5">
            <Newspaper className="size-4" />
            Anime News
          </TabsTrigger>
          <TabsTrigger value="community" className="gap-1.5">
            <MessagesSquare className="size-4" />
            Community Talks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          <SectionHeading
            title="Anime Movies"
            subtitle="Stream cinematic features — free and premium." />
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {movies.map((m) =>
            <MediaCard key={m.id} item={m} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="manga">
          <SectionHeading
            title="Manga Reader"
            subtitle="Dive into chapters from your favorite series." />
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {manga.map((m) =>
            <MediaCard key={m.id} item={m} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="news">
          <SectionHeading
            title="Anime News"
            subtitle="The latest announcements, interviews, and charts." />
          
          <div className="grid gap-4 md:grid-cols-2">
            {news.map((n) =>
            <NewsCard key={n.id} article={n} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="community">
          <div className="flex items-end justify-between">
            <SectionHeading
              title="Community Talks"
              subtitle="Join the conversation with fellow fans." />
            
            <Button asChild variant="outline" size="sm" className="mb-5 gap-1.5">
              <Link href="/forum">
                Open forum
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {forumPosts.slice(0, 3).map((p) =>
            <ForumPostCard key={p.id} post={p} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>);

}