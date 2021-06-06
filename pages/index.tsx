import Creator from '@/components/Creator';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>VCalc - Design your calculator</title>
      </Head>
      <div>
        <Creator />
      </div>
    </div>
  );
}
