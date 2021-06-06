import { useEffect, useState } from 'react';
import { HashObject, getHashObject } from '@/lib/translate';

export default function CalcPage() {
  const [hash, setHash]: [hash: HashObject | null, setHash: Function] =
    useState(null);

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash != '') {
      setHash(getHashObject(hash));
    }
  }, []);

  return <div>{JSON.stringify(hash)}</div>;
}
