import Head from 'next/head';

import Calculator from '@/components/calc/Calculator';

import useHash from '@/hooks/hash';

export default function CalcPage() {
  const hash = useHash();
  return (
    <div>
      <Head>
        <title>{hash && hash.title ? hash.title : 'VCalc App'}</title>
      </Head>
      {hash && 'inputs' in hash && 'outputs' in hash && (
        <Calculator hash={hash} />
      )}
      {hash === null && <div>Loading your app...</div>}
      {hash === false && <div>Invalid link</div>}
    </div>
  );
}
