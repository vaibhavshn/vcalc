import { FormEvent } from 'react';
import { camelCase } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '@heroicons/react/outline';

import { formatField } from '@/lib/format';
import { InputActions, Inputs } from '@/hooks/inputs';

const InputCard = ({
  dispatcher,
  data,
}: {
  dispatcher: Function;
  data: [string, string];
}) => {
  const [field, value] = data;
  return (
    <div className="flex flex-col w-full p-4 border shadow-sm" key={field}>
      <div className="flex items-center justify-between">
        <div className="text-sm">{formatField(field)}</div>
        <XIcon
          className="h-5 text-red-500 cursor-pointer"
          onClick={(_) =>
            dispatcher({ type: InputActions.delete, data: field })
          }
        />
      </div>
      <div className="flex flex-col mt-2">
        <div className="text-xs text-gray-400">Default Value</div>
        <input
          type="text"
          placeholder="Default value"
          className="border h-8 px-2 text-sm border-gray-300"
          defaultValue={value}
          onChange={(e) => {
            dispatcher({
              type: InputActions.update,
              data: { [field]: e.target.value },
            });
          }}
        />
      </div>
      <div className="flex flex-col mt-2">
        <div className="text-xs text-gray-400">Variable Name</div>
        <div className="flex items-center w-full h-8 px-2 border-2 text-sm font-mono bg-gray-100">
          {field}
        </div>
      </div>
    </div>
  );
};

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

const InputsView = ({
  inputs,
  dispatcher,
  variableExists,
}: {
  inputs: Inputs;
  dispatcher: Function;
  variableExists: Function;
}) => {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto space-y-3">
      <AnimatePresence>
        {Object.entries(inputs).map((data) => {
          const [field, _] = data;
          return (
            <motion.div
              layout
              key={field}
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1.0, opacity: 1.0 }}
              exit={{ scale: 0.4, opacity: 0 }}
            >
              <InputCard dispatcher={dispatcher} data={data} />
            </motion.div>
          );
        })}
        <motion.div
          layout
          key="inputText"
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1.0, opacity: 1.0 }}
          exit={{ scale: 0.4, opacity: 0 }}
        >
          <InputField dispatcher={dispatcher} variableExists={variableExists} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InputsView;
