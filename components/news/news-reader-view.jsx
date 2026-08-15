'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Lock, Sparkles } from 'lucide-react';
import { news } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { FreeTag, PremiumTag } from '@/components/role-badge';

export function NewsReaderView({ article }) {
  const { canAccessPremium, openKPay, currentUser, openAuth } = useApp();
  const router = useRouter();
  const locked = article.premium && !canAccessPremium;

  const related = news.filter((n) => n.id !== article.id).slice(0, 3);

  if (locked) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to browse
        </Link>
        <div className="relative overflow-hidden rounded-xl border border-border">
          <div
            className="aspect-video bg-cover bg-center blur-xl saturate-150"
            style={{ backgroundImage: `url(${article.cover})` }} />
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
            <div className="max-w-sm px-6 text-center">
              <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
                <Lock className="size-6" />
              </span>
              <h2 className="font-display text-xl font-bold">Premium article</h2>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                This is a subscriber-only deep dive. Unlock KamiStream Premium
                to read all exclusive interviews and features.
              </p>
              <Button
                onClick={() => (currentUser ? openKPay() : openAuth('signin'))}
                className="mt-4 gap-1.5">
                <Sparkles className="size-4" />
                Unlock with Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" />
        Back to browse
      </Link>

      <article>
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
              {article.category}
            </span>
            {article.premium ? <PremiumTag /> : <FreeTag />}
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-xl border border-border">
          <Image
            src={article.cover || '/placeholder.svg'}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority />
        </div>

        <div className="space-y-4 text-base leading-relaxed text-foreground/90">
          <p className="text-lg font-medium text-foreground">
            {article.excerpt}
          </p>
          <p>
            The anime industry continues to evolve at a breathtaking pace, and
            this latest development is no exception. Sources close to the
            production confirm that the team behind this project has been
            working tirelessly to deliver an experience that pushes the
            boundaries of what fans have come to expect.
          </p>
          <p>
            &ldquo;We wanted to create something that honors the legacy of the
            source material while also bringing fresh perspectives,&rdquo; a
            key creative lead shared during a recent press event. The
            commitment to quality is evident in every frame, from the
            meticulously crafted character designs to the sweeping orchestral
            score that accompanies the most pivotal scenes.
          </p>
          <p>
            Fans can look forward to a release that balances intimate character
            moments with the kind of large-scale action set pieces that have
            become a hallmark of the genre. The animation studio has reportedly
            invested heavily in new production techniques, blending traditional
            hand-drawn frames with cutting-edge digital compositing to achieve
            a look that feels both timeless and modern.
          </p>
          <p>
            As anticipation builds, the community has already begun speculating
            about what surprises may be in store. One thing is certain: this
            release is shaping up to be one of the most talked-about anime
            events of the year.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
          <Button variant="outline" size="sm">
            Share article
          </Button>
          <span className="text-sm text-muted-foreground">
            KamiStream News
          </span>
        </div>
      </article>

      <div className="mt-12">
        <h2 className="mb-4 font-display text-xl font-semibold">
          More anime news
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((n) => (
            <button
              key={n.id}
              onClick={() => router.push(`/news/${n.id}`)}
              className="group flex flex-col gap-2 overflow-hidden rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/50">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={n.cover || '/placeholder.svg'}
                  alt={n.title}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {n.category}
              </span>
              <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary">
                {n.title}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
