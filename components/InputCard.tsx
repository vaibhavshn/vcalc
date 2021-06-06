import { XIcon } from '@heroicons/react/outline';

import { formatField } from '@/lib/format';
import { InputActions } from '@/hooks/inputs';

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

export default InputCard;
