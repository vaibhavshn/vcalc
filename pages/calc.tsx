import { FormEvent, useEffect, useState } from 'react';
import { HashObject, getHashObject } from '@/lib/translate';
import { formatField } from '@/lib/format';
import { Inputs } from '@/hooks/inputs';
import { Outputs } from '@/hooks/outputs';
import Calc, { CalcResult } from '@/lib/calc';

export default function CalcPage() {
  const [hash, setHash] = useState<HashObject | null>(null);

  const [results, setResults] =
    useState<Record<string, CalcResult> | null>(null);

  const calc = new Calc();

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash != '') {
      setHash(getHashObject(hash));
    }
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

  return (
    <div
      className={`grid grid-cols-1 ${
        results ? 'md:grid-cols-2 max-w-4xl' : 'max-w-lg'
      } gap-4 md:gap-0 w-full mx-auto p-6`}
    >
      <form
        className="flex flex-col space-y-3 p-4 border"
        onSubmit={handleSubmit}
      >
        {!hash && <div>null hash</div>}
        {hash &&
          'inputs' in hash &&
          Object.entries(hash.inputs).map(([field, value]) => (
            <div className="flex flex-col" key={field}>
              <label htmlFor="">{formatField(field)}</label>
              <input
                type="text"
                value={value}
                placeholder={formatField(field)}
                onChange={(e) => {
                  const inputs = Object.assign({}, hash.inputs, {
                    [field]: e.target.value,
                  });
                  setHash(Object.assign({}, hash, { inputs }));
                }}
              />
            </div>
          ))}
        <button className="py-2 font-light uppercase border">Calculate</button>
      </form>
      {results && (
        <div className="p-4 bg-gradient-to-br from-gray-900 to-gray-700 text-gray-200 space-y-3">
          {Object.entries(results).map(
            ([field, data]: [field: string, data: any]) => (
              <div key={field}>
                <div className="text-sm font-light">{formatField(field)}</div>
                <div
                  className={`text-lg font-bold ${
                    data.error ? 'text-red-500' : 'text-gray-100'
                  }`}
                >
                  {data.error ?? data.value}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
