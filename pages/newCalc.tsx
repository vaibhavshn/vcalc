import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorIcon, SunIcon } from '@heroicons/react/outline';

import { formatField } from '@/lib/format';
import useCalc from '@/hooks/calc';
import { FormEvent, useState } from 'react';
import { Inputs } from '@/hooks/inputs';
import { Outputs } from '@/hooks/outputs';

import { range } from 'lodash';
import Calc, { CalcResult } from '@/lib/calc';

enum ViewModes {
  normal,
  sheet,
}

const SheetView = ({
  inputs,
  outputs,
}: {
  inputs: Inputs;
  outputs: Outputs;
}) => {
  const [rowCount, setRowCount] = useState<number>(5);
  const fields: string[] = [...Object.keys(inputs), ...Object.keys(outputs)];

  return (
    <div className="w-full mx-auto">
      <div className="w-full my-12 overflow-x-scroll py-4">
        <div className="table w-full border-l-2 border-t-2">
          <SheetHeader fields={fields} />
          <div>
            {range(rowCount).map((i) => {
              return (
                <SheetRow key={`row-${i}`} inputs={inputs} outputs={outputs} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <button
          className="block px-12 py-2 mx-auto bg-gray-200 text-gray-900 rounded-lg"
          onClick={(_) => setRowCount(rowCount + 1)}
        >
          Add a row
        </button>
        <button
          className="block px-12 py-2 mx-auto bg-gray-200 text-gray-900 rounded-lg"
          onClick={(_) => setRowCount(0)}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

const SheetHeader = ({ fields }: { fields: string[] }) => {
  return (
    <div className="flex w-auto whitespace-nowrap">
      {fields.map((field) => (
        <input
          type="text"
          className="cell font-bold"
          value={formatField(field)}
          key={field}
          disabled
        />
      ))}
    </div>
  );
};

const SheetRow = ({
  inputs,
  outputs,
}: {
  inputs: Inputs;
  outputs: Outputs;
}) => {
  const calc = new Calc();
  const [results, setResults] =
    useState<Record<string, CalcResult> | null>(null);

  const [rowInputs, setRowInputs] = useState<Inputs>(
    Object.fromEntries(
      Object.entries(inputs).map(([field, _]) => {
        return [field, ''];
      })
    )
  );

  const calculate = (_rowInputs: Inputs) => {
    setResults(calc.calculate(_rowInputs, outputs));
  };

  const evaluate = (_rowInputs: Inputs) => {
    setRowInputs(_rowInputs);
    calculate(_rowInputs);
  };

  return (
    <div className="flex w-auto whitespace-nowrap">
      {Object.entries(rowInputs).map(([field, value]) => (
        <input
          type="text"
          className="cell"
          key={field}
          value={value}
          onChange={(e) => {
            evaluate(
              Object.assign({}, rowInputs, {
                [field]: e.target.value,
              })
            );
          }}
        />
      ))}
      {Object.entries(outputs).map(([field, value]) => (
        <input
          type="text"
          className="cell"
          value={results ? results[field].error ?? results[field].value : ''}
          key={field}
          disabled
        />
      ))}
    </div>
  );
};

export default function CalcPage() {
  const { hash, loaded, results, setHash, handleSubmit } = useCalc();
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.sheet);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {hash && 'inputs' in hash && (
        <div className="flex flex-col w-full mx-auto rounded-lg overflow-hidden">
          <div className="px-4 py-12 text-center space-y-6">
            <h1 className="text-3xl font-bold">
              {'title' in hash ? hash.title : 'VCalc'}
            </h1>
            <p className="text-gray-700">
              {'desc' in hash ? hash.desc : 'A dynamic calculator'}
            </p>
          </div>
          <div className="space-y-2 p-4 text-sm">
            <div className="inline-flex bg-gray-100 border-l-2 rounded-lg overflow-hidden p-1 border-2 border-gray-300">
              <button
                className={`px-4 py-2 cursor-pointer rounded-lg focus:outline-none ${
                  viewMode === ViewModes.normal ? 'bg-white shadow-lg ' : ''
                }`}
                onClick={(_) => setViewMode(ViewModes.normal)}
              >
                Normal
              </button>
              <button
                className={`px-4 py-2 cursor-pointer rounded-lg focus:outline-none ${
                  viewMode === ViewModes.sheet ? 'bg-white shadow-lg ' : ''
                }`}
                onClick={(_) => setViewMode(ViewModes.sheet)}
              >
                Sheet
              </button>
            </div>
            {viewMode === ViewModes.sheet && (
              <AnimatePresence>
                <motion.div
                  layout
                  key="sheetView"
                  initial={{ x: -100, opacity: 0.2 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <SheetView inputs={hash.inputs} outputs={hash.outputs} />
                </motion.div>
              </AnimatePresence>
            )}
            {viewMode === ViewModes.normal && (
              <AnimatePresence>
                <motion.div
                  layout
                  key="normalView"
                  initial={{ x: 100, opacity: 0.2 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row">
                    <form
                      className="flex-1 bg-white p-4 space-y-4"
                      onSubmit={handleSubmit}
                    >
                      {Object.entries(hash.inputs).map(([field, value]) => (
                        <div className="flex flex-col space-y-1">
                          <label className="text-sm">{field}</label>
                          <input
                            type="text"
                            className="border p-2"
                            placeholder={field}
                            value={value}
                            onChange={(e) => {
                              const inputs = Object.assign({}, hash.inputs, {
                                [field]: e.target.value,
                              });
                              setHash(Object.assign({}, hash, { inputs }));
                            }}
                          />
                        </div>
                      ))}
                      <button className="w-full py-2 font-light border shadow-sm rounded-md">
                        Calculate
                      </button>
                    </form>
                    <div className="flex-1 p-4 text-gray-400 bg-gray-900 space-y-2">
                      {results &&
                        Object.entries(results).map(([field, data]) => (
                          <div className="flex flex-col">
                            <label className="text-sm">{field}</label>
                            <div
                              className={`w-full text-lg font-medium ${
                                data.error ? 'text-red-500' : 'text-white'
                              }`}
                            >
                              {data.error ?? data.value}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
