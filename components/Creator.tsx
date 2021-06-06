import useCreator, { InputActions, OutputActions } from '@/hooks/creator';
import { useEffect } from 'react';
import { formatField } from '@/lib/format';

import InputsView from '@/components/InputsView';

export default function Creator() {
  const {
    inputs,
    dispatchInputs,
    outputs,
    dispatchOutputs,
    variableExists,
    formatExpression,
  } = useCreator();

  useEffect(() => {
    dispatchOutputs({
      type: OutputActions.add,
      data: { sum: 'a + b', difference: '1 + (a + b) / (a-b)' },
    });
  }, []);

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
          <div>
            {Object.entries(outputs).map(([field, expr]) => (
              <div key={field}>
                <div>{formatField(field)}</div>
                <div>{formatExpression(expr)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
