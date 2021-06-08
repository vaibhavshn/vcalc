import { FormEvent, useState } from 'react';

import Calc, { CalcResult } from '@/lib/calc';
import { Inputs } from './inputs';
import { HashObject } from '@/lib/translate';
import { Outputs } from './outputs';
import { mapValues } from 'lodash';

const useNormalCalc = (hash: HashObject) => {
  const calc = new Calc();

  const [inputs, setInputs] = useState<Inputs>(hash.inputs);
  const outputs = hash.outputs;

  const [results, setResults] =
    useState<Record<string, CalcResult> | null>(null);

  const calculate = (inputs: Inputs, outputs: Outputs) => {
    setResults(calc.calculate(inputs, outputs));
  };

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();

    calculate(inputs, outputs);

    return false;
  };

  return {
    inputs,
    setInputs,
    results,
    handleSubmit,
  };
};

const useSheetCalc = (hash: HashObject) => {
  const calc = new Calc();

  const emptyInput = mapValues(hash.inputs, (_) => '');
  const emptyResult: Record<string, CalcResult> = mapValues(
    hash.outputs,
    (_) => {
      return { value: '' };
    }
  );

  const fields = [...Object.keys(hash.inputs), ...Object.keys(hash.outputs)];

  const [inputs, setInputs] = useState<Inputs[]>(Array(5).fill(emptyInput));

  const outputs = hash.outputs;

  const [results, setResults] = useState<Record<string, CalcResult>[]>(
    Array(5).fill(emptyResult)
  );

  const setInput = (index: number, input: Inputs) => {
    const newInput = Object.assign({}, inputs[index], input);
    setInputs(
      [...inputs].map((_input, i) => {
        if (i === index) {
          return newInput;
        }
        return _input;
      })
    );
    evaluate(index, newInput);
  };

  const evaluate = (index: number, input: Inputs) => {
    const result = calc.calculate(input, outputs);
    setResults(
      [...results].map((_result, i) => {
        if (i === index) {
          return Object.assign({}, result);
        }
        return _result;
      })
    );
  };

  const addRow = () => {
    setInputs([...inputs, emptyInput]);
    setResults([...results, emptyResult]);
  };

  return {
    inputs,
    setInput,
    fields,
    outputs,
    results,
    evaluate,
    addRow,
  };
};

export { useNormalCalc, useSheetCalc };
