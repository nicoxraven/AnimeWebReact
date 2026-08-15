'use client';

import { useMemo, useState } from 'react';
import { Flame, PenLine, Plus, Search, TrendingUp, Users } from 'lucide-react';
import {
  activeMembers,
  forumCategories,
  forumPosts as seedPosts } from
'@/lib/mock-data';

import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RoleBadge } from '@/components/role-badge';
import { ForumPostCard } from '@/components/forum-post-card';



export function ForumView() {
  const { currentUser, openAuth, votes } = useApp();
  const [posts, setPosts] = useState(seedPosts);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('hot');
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).slice(0, 10),
    [posts]
  );

  const filtered = useMemo(() => {
    let list = posts.filter((p) => {
      const matchCat = category === 'All' || p.category === category;
      const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQuery;
    });
    const score = (p) => p.votes + (votes[p.id] ?? 0);
    if (sort === 'top') list = [...list].sort((a, b) => score(b) - score(a));
    if (sort === 'hot')
    list = [...list].sort(
      (a, b) => Number(b.pinned ?? 0) - Number(a.pinned ?? 0) || score(b) - score(a)
    );
    return list;
  }, [posts, category, query, sort, votes]);

  function submitPost() {
    if (!currentUser) {
      openAuth('signin');
      return;
    }
    if (!title.trim()) return;
    const post = {
      id: `f${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      author: currentUser.handle,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      category: category === 'All' ? 'Discussion' : category,
      tags: tagInput.
      split(',').
      map((t) => t.trim()).
      filter(Boolean).
      slice(0, 4),
      votes: 1,
      comments: 0,
      createdAt: 'just now'
    };
    setPosts((prev) => [post, ...prev]);
    setTitle('');
    setBody('');
    setTagInput('');
    setComposerOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Community Talks
          </h1>
          <p className="mt-1 text-muted-foreground">
            Theories, hot takes, and help threads from the KamiStream fandom.
          </p>
        </div>
        <Button onClick={() => currentUser ? setComposerOpen((o) => !o) : openAuth('signin')} className="gap-1.5">
          <PenLine className="size-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Feed */}
        <div className="space-y-4">
          {/* Search + sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts and tags…"
                className="pl-9" />
              
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border p-1">
              {
              [
              { k: 'hot', label: 'Hot', Icon: Flame },
              { k: 'top', label: 'Top', Icon: TrendingUp },
              { k: 'new', label: 'New', Icon: Plus }].

              map(({ k, label, Icon }) =>
              <button
                key={k}
                onClick={() => setSort(k)}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  sort === k ?
                  'bg-secondary text-foreground' :
                  'text-muted-foreground hover:text-foreground'
                )}>
                
                  <Icon className="size-3.5" />
                  {label}
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {forumCategories.map((c) =>
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition-colors',
                category === c ?
                'border-primary bg-primary/10 text-primary' :
                'border-border text-muted-foreground hover:text-foreground'
              )}>
              
                {c}
              </button>
            )}
          </div>

          {/* Composer */}
          {composerOpen &&
          <div className="space-y-3 rounded-xl border border-border bg-card p-4">
              <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="text-base font-medium" />
            
              <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-24 resize-none" />
            
              <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Tags (comma separated) e.g. Neon Blade, Theory" />
            
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setComposerOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submitPost}>Publish</Button>
              </div>
            </div>
          }

          {/* Posts */}
          <div className="space-y-4">
            {filtered.map((p) =>
            <ForumPostCard key={p.id} post={p} />
            )}
            {filtered.length === 0 &&
            <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                No posts match your filters yet.
              </div>
            }
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <h2 className="font-display font-semibold">Active Members</h2>
            </div>
            <ul className="space-y-3">
              {activeMembers.map((m) =>
              <li key={m.name} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-8">
                      <AvatarImage src={m.avatar || '/placeholder.svg'} alt="" />
                      <AvatarFallback>{m.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-chart-3" />
                  </div>
                  <span className="flex-1 truncate text-sm font-medium">
                    {m.name}
                  </span>
                  <RoleBadge role={m.role} />
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 font-display font-semibold">Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) =>
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-primary/15 hover:text-primary">
                
                  #{t}
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-gradient-to-b from-primary/10 to-transparent p-4">
            <h2 className="font-display font-semibold">Community Guidelines</h2>
            <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
              Be kind, tag your spoilers, and keep the fandom welcoming for
              every otaku. Reports are reviewed by moderators.
            </p>
          </div>
        </aside>
      </div>
    </div>);

}