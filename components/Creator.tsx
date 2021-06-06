import useCreator from '@/hooks/creator';

import InputsView from '@/components/InputsView';
import OutputsView from '@/components/OutputsView';
import { getHash } from '@/lib/translate';

export default function Creator() {
  const {
    inputs,
    dispatchInputs,
    outputs,
    dispatchOutputs,
    variableExists,
    clearAll,
  } = useCreator();

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md mx-auto my-6 block text-sm"
          onClick={(_) => clearAll()}
        >
          Clear All
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md mx-auto my-6 block text-sm"
          onClick={(_) => {
            window.open(`/calc#${getHash({ inputs, outputs })}`, '_blank');
          }}
        >
          Preview
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto p-6">
        <InputsView
          inputs={inputs}
          dispatcher={dispatchInputs}
          variableExists={variableExists}
        />
        <OutputsView
          outputs={outputs}
          dispatcher={dispatchOutputs}
          variableExists={variableExists}
        />
      </div>
    </div>
  );
}
