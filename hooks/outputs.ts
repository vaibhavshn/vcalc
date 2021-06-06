import { useState } from 'react';
import { omit } from 'lodash';

enum OutputActions {
  add,
  update,
  delete,
  clear,
}

type Outputs = Record<string, string>;

interface OutputAction {
  type: OutputActions;
  data?: any;
}

const useOutputs = () => {
  const [outputs, setOutputs]: [outputs: Outputs, setOutputs: Function] =
    useState({});

  const addOutput = (input: Outputs) => {
    setOutputs(Object.assign({}, outputs, input));
  };

  const deleteOutput = (key: string) => {
    setOutputs(omit(outputs, key));
  };

  const dispatchOutputs: Function = (action: OutputAction) => {
    switch (action.type) {
      case OutputActions.add:
      case OutputActions.update:
        addOutput(action.data);
        break;
      case OutputActions.delete:
        deleteOutput(action.data);
        break;
      case OutputActions.clear:
        setOutputs({});
        break;
      default:
        break;
    }
  };

  return [outputs, dispatchOutputs] as const;
};

export type { Outputs, OutputAction };
export { OutputActions };
export default useOutputs;
