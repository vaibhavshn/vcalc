import { useEffect, useState } from 'react';
import { getHashObject, HashObject } from '@/lib/translate';

const useHash = () => {
  const [hash, setHash] = useState<HashObject | null | false>(null);
  useEffect(() => {
    const hash = window.location.hash.substr(1);
    const result = hash.length === 0 ? false : getHashObject(hash) ?? false;
    setHash(result);
  }, []);
  return hash;
};

export default useHash;
