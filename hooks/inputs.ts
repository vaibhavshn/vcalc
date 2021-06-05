import { useState } from 'react';
import { omit } from 'lodash';

enum InputActions {
  add,
  update,
  delete,
  clear,
}

type Inputs = Record<string, string>;

interface InputAction {
  type: InputActions;
  data?: any;
}

const useInputs = () => {
  const [inputs, setInputs]: [inputs: Inputs, setInputs: Function] = useState({
    a: '120',
    b: '100',
  });

  const addInput = (input: Inputs) => {
    setInputs(Object.assign({}, inputs, input));
  };

  const deleteInput = (key: string) => {
    setInputs(omit(inputs, key));
  };

  const dispatchInputs: Function = (action: InputAction) => {
    switch (action.type) {
      case InputActions.add:
      case InputActions.update:
        addInput(action.data);
        break;
      case InputActions.delete:
        deleteInput(action.data);
        break;
      case InputActions.clear:
        setInputs({});
        break;
      default:
        break;
    }
  };

  const getInputVariables = () => Object.keys(inputs);

  return [inputs, dispatchInputs, getInputVariables] as const;
};

export type { Inputs, InputAction };
export { InputActions };
export default useInputs;
