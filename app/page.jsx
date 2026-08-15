import { media } from '@/lib/mock-data';
import { CoverFlow } from '@/components/home/cover-flow';
import { HomeContent } from '@/components/home/home-content';

const trending = media.filter((m) => m.trending);

export default function HomePage() {
  return (
    <>
      <CoverFlow items={trending} />
      <HomeContent />
    </>);

}