import { FormEvent } from 'react';
import { camelCase } from 'lodash';
import { OutputActions } from '@/hooks/outputs';

const OutputField = ({
  dispatcher,
  variableExists,
}: {
  dispatcher: Function;
  variableExists: Function;
}) => {
  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();

    const form = e.target as typeof e.target & {
      outputField: { value: string; scrollIntoView: Function; focus: Function };
      outputExpr: { value: string; scrollIntoView: Function; focus: Function };
    };

    const field = camelCase(form.outputField.value);

    if (variableExists(field)) {
      alert(
        `The field variable name "${field}" is already in use, please try again.`
      );
      return false;
    }

    const expr = form.outputExpr.value;

    if (expr === '') {
      alert(`Expression for ${field} cannot be empty`);
      return false;
    }

    dispatcher({ type: OutputActions.add, data: { [field]: expr } });

    form.outputField.value = '';
    form.outputExpr.value = '';
    form.outputField.focus();

    setTimeout(() => {
      form.outputExpr.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    return false;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="outputFieldName" className="text-xs text-gray-500">
        Add field
      </label>
      <div className="flex flex-col space-y-1">
        <input
          type="text"
          id="outputFieldName"
          name="outputField"
          placeholder="Output Field"
          className="w-full h-10 px-3 text-sm border border-gray-200"
        />
        <input
          type="text"
          id="outputExpr"
          name="outputExpr"
          placeholder="Expression"
          className="w-full h-10 px-3 text-sm border border-gray-200"
        />
        <button className="text-sm py-2 bg-gray-100 text-gray-600 border rounded-sm">
          Add
        </button>
      </div>
    </form>
  );
};

export default OutputField;
