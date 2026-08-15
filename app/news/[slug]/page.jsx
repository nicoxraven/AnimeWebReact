import { notFound } from 'next/navigation';
import { news } from '@/lib/mock-data';
import { NewsReaderView } from '@/components/news/news-reader-view';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.id }));
}

export default async function NewsPage({ params }) {
  const { slug } = await params;
  const article = news.find((n) => n.id === slug);
  if (!article) notFound();
  return <NewsReaderView article={article} />;
}
