import { Inputs } from '@/hooks/inputs';
import { Outputs } from '@/hooks/outputs';
import { CalcResult } from '@/lib/calc';

const SheetRow = ({
  index,
  inputs,
  outputs,
  setInput,
  results,
  evaluate,
}: {
  index: number;
  inputs: Inputs;
  outputs: Outputs;
  setInput: Function;
  results: Record<string, CalcResult>;
  evaluate: Function;
}) => {
  return (
    <div className="flex w-auto whitespace-nowrap">
      {Object.entries(inputs).map(([field, value]) => (
        <input
          type="text"
          className="cell"
          key={field}
          value={value}
          onChange={(e) => {
            setInput(index, { [field]: e.target.value });
          }}
        />
      ))}
      {Object.entries(results).map(([field, value]) => (
        <input
          type="text"
          className="cell"
          value={value ? value.error ?? value.value : ''}
          key={field}
          disabled
        />
      ))}
    </div>
  );
};

export default SheetRow;
