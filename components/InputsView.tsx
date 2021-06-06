import { AnimatePresence, motion } from 'framer-motion';

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
    <div className="flex flex-col w-full max-w-md mx-auto space-y-3">
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
        key="inputText"
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1.0, opacity: 1.0 }}
      >
        <InputField dispatcher={dispatcher} variableExists={variableExists} />
      </motion.div>
    </div>
  );
};

export default InputsView;
