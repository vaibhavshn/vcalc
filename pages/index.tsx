import Creator from '@/components/Creator';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="mb-24">
      <Head>
        <title>VCalc - Design your calculator</title>
      </Head>
      <div>
        <Creator />
      </div>
    </div>
  );
}
