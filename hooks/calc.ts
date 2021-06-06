import { FormEvent, useEffect, useState } from 'react';

import Calc, { CalcResult } from '@/lib/calc';
import { getHashObject, HashObject } from '@/lib/translate';
import { Inputs } from './inputs';
import { Outputs } from './outputs';

const useCalc = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hash, setHash] = useState<HashObject | null>(null);
  const calc = new Calc();

  const [results, setResults] =
    useState<Record<string, CalcResult> | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash != '') {
      setHash(getHashObject(hash));
    }
    setLoaded(true);
  }, []);

  const calculate = (inputs: Inputs, outputs: Outputs) => {
    setResults(calc.calculate(inputs, outputs));
  };

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    if (!hash) return false;
    const inputs = hash.inputs;
    const outputs = hash.outputs;

    calculate(inputs, outputs);

    return false;
  };

  return { hash, setHash, loaded, results, handleSubmit };
};

export default useCalc;
