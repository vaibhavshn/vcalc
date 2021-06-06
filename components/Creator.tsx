import useCreator, { InputActions, OutputActions } from '@/hooks/creator';

import InputsView from '@/components/InputsView';
import OutputsView from '@/components/OutputsView';

export default function Creator() {
  const {
    inputs,
    dispatchInputs,
    outputs,
    dispatchOutputs,
    variableExists,
    formatExpression,
  } = useCreator();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto p-6">
        <div>
          <h3 className="text-2xl font-light text-gray-800 text-center my-8">
            Inputs
          </h3>
          <InputsView
            inputs={inputs}
            dispatcher={dispatchInputs}
            variableExists={variableExists}
          />
        </div>
        <div>
          <h3 className="text-2xl font-light text-gray-800 text-center my-8">
            Outputs
          </h3>
          <OutputsView
            outputs={outputs}
            dispatcher={dispatchOutputs}
            variableExists={variableExists}
          />
        </div>
      </div>
    </div>
  );
}
