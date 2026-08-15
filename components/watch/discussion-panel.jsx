'use client';

import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { comments as seedComments } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RoleBadge } from '@/components/role-badge';

export function DiscussionPanel() {
  const { currentUser, openAuth } = useApp();
  const [items, setItems] = useState(seedComments);
  const [draft, setDraft] = useState('');
  const [liked, setLiked] = useState({});

  function post() {
    if (!currentUser) {
      openAuth('signin');
      return;
    }
    if (!draft.trim()) return;
    const c = {
      id: `c${Date.now()}`,
      author: currentUser.handle,
      avatar: currentUser.avatar,
      role: currentUser.role,
      body: draft.trim(),
      time: 'just now',
      likes: 0
    };
    setItems((prev) => [c, ...prev]);
    setDraft('');
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-display font-semibold">Discussion</h2>
        <span className="text-sm text-muted-foreground">
          {items.length} comments
        </span>
      </div>

      {/* Composer */}
      <div className="border-b border-border p-4">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={
          currentUser ? 'Share your thoughts…' : 'Sign in to join the talk…'
          }
          onKeyDown={(e) => {
            if (
            e.key === 'Enter' && (
            e.metaKey || e.ctrlKey) &&
            !e.nativeEvent.isComposing)
            {
              e.preventDefault();
              post();
            }
          }}
          className="min-h-20 resize-none" />
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            ⌘/Ctrl + Enter to post
          </span>
          <Button size="sm" onClick={post} className="gap-1.5">
            <Send className="size-3.5" />
            Post
          </Button>
        </div>
      </div>

      {/* Comments */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {items.map((c) =>
        <div key={c.id} className="flex gap-3">
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={c.avatar || '/placeholder.svg'} alt="" />
              <AvatarFallback>{c.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{c.author}</span>
                <RoleBadge role={c.role} />
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
              <p className="mt-1 text-sm text-foreground/90">{c.body}</p>
              <button
              onClick={() =>
              setLiked((p) => ({ ...p, [c.id]: !p[c.id] }))
              }
              className={cn(
                'mt-1.5 flex items-center gap-1 text-xs transition-colors',
                liked[c.id] ?
                'text-primary' :
                'text-muted-foreground hover:text-foreground'
              )}>
              
                <Heart
                className={cn('size-3.5', liked[c.id] && 'fill-current')} />
              
                {c.likes + (liked[c.id] ? 1 : 0)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

}