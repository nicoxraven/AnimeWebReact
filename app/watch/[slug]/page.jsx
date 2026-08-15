import { notFound } from 'next/navigation';
import { media } from '@/lib/mock-data';
import { WatchView } from '@/components/watch/watch-view';

export function generateStaticParams() {
  return media.map((m) => ({ slug: m.slug }));
}

export default async function WatchPage({
  params


}) {
  const { slug } = await params;
  const item = media.find((m) => m.slug === slug);
  if (!item) notFound();
  return <WatchView item={item} />;
}