'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Film, Loader as Loader2, Newspaper, PenLine, Plus, Sparkles, Trash2, Tv, Wand as Wand2 } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { supabase } from '@/lib/supabase-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const CONTENT_TYPES = [
  { k: 'movie', label: 'Movie', Icon: Film },
  { k: 'series', label: 'Series', Icon: Tv },
  { k: 'manga', label: 'Manga', Icon: BookOpen },
  { k: 'news', label: 'News', Icon: Newspaper },
];

const AI_PROMPTS = [
  'A cyberpunk samurai discovers his memories were stolen by a shadow syndicate.',
  'A shrine maiden must choose which of two worlds survives the next eclipse.',
  'A reluctant pilot bonds with the last prototype mech to defend a dying city.',
  'A cursed student inherits forbidden magic that threatens to consume him.',
];

export function StudioView() {
  const { currentUser, openAuth } = useApp();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('ai');
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [type, setType] = useState('movie');
  const [genres, setGenres] = useState('');
  const [premium, setPremium] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    loadContent();
  }, [currentUser]);

  async function loadContent() {
    setLoading(true);
    const { data } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  function generateAI() {
    setGenerating(true);
    const prompt = AI_PROMPTS[Math.floor(Math.random() * AI_PROMPTS.length)];
    setTimeout(() => {
      const words = prompt.split(' ');
      const generatedTitle = words
        .slice(0, 3)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      setTitle(generatedTitle);
      setSynopsis(prompt);
      setGenres(['Action', 'Fantasy', 'Sci-Fi'][Math.floor(Math.random() * 3)]);
      setGenerating(false);
    }, 1400);
  }

  async function saveContent() {
    if (!title.trim()) return;
    setSaving(true);
    const { data } = await supabase
      .from('content')
      .insert({
        title: title.trim(),
        type,
        synopsis: synopsis.trim(),
        genres: genres.split(',').map((g) => g.trim()).filter(Boolean),
        premium,
        source: tab === 'ai' ? 'ai' : 'editor',
        status: 'published',
        author_id: currentUser?.id || null,
        author_name: currentUser?.name || 'Unknown',
        cover: '/placeholder.svg',
      })
      .select()
      .single();

    if (data) {
      setItems((prev) => [data, ...prev]);
    }
    setTitle('');
    setSynopsis('');
    setGenres('');
    setPremium(false);
    setSaving(false);
  }

  async function deleteContent(id) {
    await supabase.from('content').delete().eq('id', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-secondary">
          <PenLine className="size-7 text-muted-foreground" />
        </span>
        <h1 className="font-display text-2xl font-bold">Creator Studio</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to start creating content for KamiStream.
        </p>
        <Button onClick={() => openAuth('signin')} className="mt-6">
          Sign in to continue
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Creator Studio
        </h1>
        <p className="mt-1 text-muted-foreground">
          Generate content with AI or write it yourself. Manage your published works.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="gap-6">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-card p-1.5">
          <TabsTrigger value="ai" className="gap-1.5">
            <Wand2 className="size-4" />
            AI Generate
          </TabsTrigger>
          <TabsTrigger value="editor" className="gap-1.5">
            <PenLine className="size-4" />
            Content Editor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">
                AI Content Generator
              </h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Click generate to get an AI-suggested title, synopsis, and genre.
              Tweak the result before publishing.
            </p>

            <Button
              onClick={generateAI}
              disabled={generating}
              className="mb-6 gap-2">
              {generating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Wand2 className="size-4" />
              )}
              {generating ? 'Generating…' : 'Generate content'}
            </Button>

            <ContentForm
              title={title}
              setTitle={setTitle}
              synopsis={synopsis}
              setSynopsis={setSynopsis}
              type={type}
              setType={setType}
              genres={genres}
              setGenres={setGenres}
              premium={premium}
              setPremium={setPremium}
              saving={saving}
              onSave={saveContent}
            />
          </div>
        </TabsContent>

        <TabsContent value="editor">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <PenLine className="size-5 text-accent" />
              <h2 className="font-display text-lg font-semibold">
                Content Editor
              </h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Write and publish your own content manually.
            </p>

            <ContentForm
              title={title}
              setTitle={setTitle}
              synopsis={synopsis}
              setSynopsis={setSynopsis}
              type={type}
              setType={setType}
              genres={genres}
              setGenres={setGenres}
              premium={premium}
              setPremium={setPremium}
              saving={saving}
              onSave={saveContent}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold">
          Your published content
        </h2>
        {loading ? (
          <div className="grid place-items-center py-12">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
            No content yet. Start creating above.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-lg',
                    item.source === 'ai'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-accent/15 text-accent'
                  )}>
                  {item.source === 'ai' ? (
                    <Sparkles className="size-5" />
                  ) : (
                    <PenLine className="size-5" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className="rounded-md bg-secondary px-1.5 py-0.5 text-xs capitalize text-muted-foreground">
                      {item.type}
                    </span>
                    {item.premium && (
                      <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-xs font-medium text-primary">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {item.synopsis || 'No synopsis'}
                  </p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {item.source === 'ai' ? 'AI' : 'Editor'}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => deleteContent(item.id)}
                  aria-label="Delete content">
                  <Trash2 className="size-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContentForm({
  title,
  setTitle,
  synopsis,
  setSynopsis,
  type,
  setType,
  genres,
  setGenres,
  premium,
  setPremium,
  saving,
  onSave,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CONTENT_TYPES.map(({ k, label, Icon }) => (
          <button
            key={k}
            onClick={() => setType(k)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              type === k
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}>
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title…"
          className="h-11" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content-synopsis">Synopsis</Label>
        <Textarea
          id="content-synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Write a synopsis…"
          className="min-h-28 resize-none" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content-genres">Genres (comma separated)</Label>
        <Input
          id="content-genres"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          placeholder="Action, Fantasy, Sci-Fi"
          className="h-11" />
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={premium} onCheckedChange={setPremium} />
        <Label className="cursor-pointer" onClick={() => setPremium((p) => !p)}>
          Mark as Premium content
        </Label>
      </div>

      <Button onClick={onSave} disabled={saving || !title.trim()} className="gap-2">
        {saving && <Loader2 className="size-4 animate-spin" />}
        <Plus className="size-4" />
        Publish content
      </Button>
    </div>
  );
}
