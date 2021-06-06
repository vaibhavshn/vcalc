import Creator from '@/components/Creator';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>VCalc - Design your calculator</title>
      </Head>
      <div>
        <div className="flex items-center justify-between">
          <button
            onClick={(_) => window.location.reload()}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md mx-auto my-6 block"
          >
            Reload
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md mx-auto my-6 block">
            Preview
          </button>
        </div>
        <Creator />
      </div>
    </div>
  );
}
