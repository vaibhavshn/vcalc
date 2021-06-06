import { Inputs } from '@/hooks/inputs';
import { Outputs } from '@/hooks/outputs';

interface HashObject {
  inputs: Inputs;
  outputs: Outputs;
}

const getHash = (obj: HashObject): string | null => {
  try {
    return btoa(JSON.stringify(obj));
  } catch (_) {}
  return null;
};

const getHashObject = (hash: string): HashObject | null => {
  try {
    const obj = JSON.parse(atob(hash));
    if (!('inputs' in obj) && !('outputs' in obj)) {
      return null;
    }
    return obj;
  } catch (_) {}
  return null;
};

export type { HashObject };
export { getHash, getHashObject };
