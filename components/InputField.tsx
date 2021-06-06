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

    const form = e.target as typeof e.target & {
      inputField: { value: string; scrollIntoView: Function; focus: Function };
      inputDefault: { value: string };
    };

    const field = camelCase(form.inputField.value);
    const defaultValue = form.inputDefault.value;

    if (variableExists(field)) {
      alert(
        `The field variable name "${field}" is already in use, please try again.`
      );
      return;
    }

    dispatcher({ type: InputActions.add, data: { [field]: defaultValue } });

    form.inputField.value = '';
    form.inputDefault.value = '';
    form.inputField.focus();
    setTimeout(() => {
      form.inputField.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    return false;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="inputText" className="text-xs text-gray-500">
        Add field
      </label>
      <div className="flex flex-col space-y-1">
        <input
          type="text"
          id="inputField"
          name="inputField"
          placeholder="Add Field"
          className="w-full h-10 px-3 text-sm border border-gray-200 rounded-sm"
        />
        <input
          type="text"
          id="inputDefault"
          name="inputDefault"
          placeholder="Default Value"
          className="w-full h-10 px-3 text-sm border border-gray-200 rounded-sm"
        />
        <button className="text-sm py-2 bg-gray-100 text-gray-600 border rounded-sm">
          Add
        </button>
      </div>
    </form>
  );
};

export default InputField;
