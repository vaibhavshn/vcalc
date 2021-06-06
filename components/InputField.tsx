import { FormEvent } from 'react';
import { camelCase } from 'lodash';
import { InputActions } from '@/hooks/inputs';

const InputField = ({
  dispatcher,
  variableExists,
}: {
  dispatcher: Function;
  variableExists: Function;
}) => {
  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    const target = e.target as typeof e.target & {
      inputText: { value: string };
    };
    const field = camelCase(target.inputText.value);
    if (variableExists(field)) {
      alert(
        `The field variable name "${field}" is already in use, please try again.`
      );
      return;
    }
    dispatcher({ type: InputActions.add, data: { [field]: '' } });

    target.inputText.value = '';
    return false;
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="inputText"
        placeholder="Add Field"
        className="w-full h-10 px-3 border-2"
      />
    </form>
  );
};

export default InputField;
