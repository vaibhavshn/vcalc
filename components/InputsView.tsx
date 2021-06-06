import { motion } from 'framer-motion';
import { CollectionIcon } from '@heroicons/react/outline';

import InputField from '@/components/InputField';
import InputCard from '@/components/InputCard';
import { Inputs } from '@/hooks/inputs';

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
    <div>
      <motion.div
        layout
        key="inputsHeading"
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1.0, opacity: 1.0 }}
      >
        <h3 className="text-2xl font-light text-gray-800 text-center my-8">
          Inputs
        </h3>
      </motion.div>
      <div className="flex flex-col w-full max-w-md mx-auto space-y-3">
        {Object.keys(inputs).length === 0 && (
          <motion.div
            layout
            key="emptyInputs"
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1.0, opacity: 1.0 }}
          >
            <div className="flex flex-col items-center space-y-2 my-6">
              <CollectionIcon className="h-20 text-gray-400" />
              <p className="text-sm text-gray-500">
                Start by adding some fields
              </p>
            </div>
          </motion.div>
        )}
        {Object.entries(inputs).map((data) => {
          const [field, _] = data;
          return (
            <motion.div
              layout
              key={field}
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1.0, opacity: 1.0 }}
            >
              <InputCard dispatcher={dispatcher} data={data} />
            </motion.div>
          );
        })}
        <motion.div
          layout
          key="inputField"
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1.0, opacity: 1.0 }}
        >
          <InputField dispatcher={dispatcher} variableExists={variableExists} />
        </motion.div>
      </div>
    </div>
  );
};

export default InputsView;
