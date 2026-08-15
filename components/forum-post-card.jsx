'use client';

import { ChevronUp, MessageSquare, Pin } from 'lucide-react';

import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RoleBadge } from '@/components/role-badge';

export function ForumPostCard({ post }) {
  const { votes, vote } = useApp();
  const delta = votes[post.id] ?? 0;
  const total = post.votes + delta;

  return (
    <article className="flex gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      {/* Vote control */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => vote(post.id, 1)}
          aria-label="Upvote"
          className={cn(
            'grid size-8 place-items-center rounded-lg border transition-colors',
            delta === 1 ?
            'border-primary bg-primary/15 text-primary' :
            'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
          )}>
          
          <ChevronUp className="size-4" />
        </button>
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            delta === 1 && 'text-primary'
          )}>
          
          {total}
        </span>
        <button
          onClick={() => vote(post.id, -1)}
          aria-label="Downvote"
          className={cn(
            'grid size-8 place-items-center rounded-lg border transition-colors',
            delta === -1 ?
            'border-accent bg-accent/15 text-accent' :
            'border-border text-muted-foreground hover:border-accent/50 hover:text-accent'
          )}>
          
          <ChevronUp className="size-4 rotate-180" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.pinned &&
          <span className="flex items-center gap-1 font-medium text-primary">
              <Pin className="size-3" />
              Pinned
            </span>
          }
          <span className="rounded-md bg-secondary px-1.5 py-0.5 font-medium text-foreground">
            {post.category}
          </span>
          <span>·</span>
          <span>{post.createdAt}</span>
        </div>

        <h3 className="font-medium leading-snug text-pretty">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.body}</p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) =>
          <span
            key={t}
            className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
            
              #{t}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={post.authorAvatar || '/placeholder.svg'} alt="" />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{post.author}</span>
            <RoleBadge role={post.authorRole} />
          </div>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageSquare className="size-4" />
            {post.comments}
          </span>
        </div>
      </div>
    </article>);

}