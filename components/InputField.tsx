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

    const inputText = (
      e.target as typeof e.target & {
        inputText: { value: string; scrollIntoView: Function };
      }
    )['inputText'];

    const field = camelCase(inputText.value);

    if (variableExists(field)) {
      alert(
        `The field variable name "${field}" is already in use, please try again.`
      );
      return;
    }

    dispatcher({ type: InputActions.add, data: { [field]: '' } });

    inputText.value = '';
    setTimeout(() => {
      inputText.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    return false;
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <label htmlFor="inputText" className="text-xs text-gray-500">
        Add field
      </label>
      <input
        type="text"
        id="inputText"
        name="inputText"
        placeholder="Add Field"
        className="w-full h-10 px-3 text-sm border border-gray-200 rounded-sm"
      />
    </form>
  );
};

export default InputField;
