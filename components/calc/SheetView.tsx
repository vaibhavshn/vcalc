import { useState } from 'react';
import { range } from 'lodash';

import SheetRow from './SheetRow';

import { formatField } from '@/lib/format';
import { Inputs } from '@/hooks/inputs';
import { Outputs } from '@/hooks/outputs';
import { CalcResult } from '@/lib/calc';

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

const SheetView = ({
  inputs,
  outputs,
  setInput,
  fields,
  addRow,
  results,
  evaluate,
}: {
  inputs: Inputs[];
  outputs: Outputs;
  setInput: Function;
  fields: string[];
  addRow: Function;
  results: Record<string, CalcResult>[];
  evaluate: Function;
}) => {
  // const [rowCount, setRowCount] = useState<number>(5);

  return (
    <div className="w-full mx-auto">
      <div className="w-full mb-12 overflow-x-auto py-4">
        <div className="table w-full border-l-2 border-t-2">
          <SheetHeader fields={fields} />
          <div>
            {inputs.map((input, index) => {
              return (
                <SheetRow
                  key={`row-${index}`}
                  index={index}
                  inputs={input}
                  setInput={setInput}
                  outputs={outputs}
                  results={results[index]}
                  evaluate={evaluate}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <button
          className="block px-12 py-2 mx-auto bg-gray-200 text-gray-900 rounded-lg"
          onClick={(_) => addRow()}
        >
          Add a row
        </button>
      </div>
    </div>
  );
};

export default SheetView;
