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
    return JSON.parse(atob(hash));
  } catch (_) {}
  return null;
};

export type { HashObject };
export { getHash, getHashObject };
