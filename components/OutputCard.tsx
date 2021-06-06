import { XIcon } from '@heroicons/react/outline';

import { OutputActions } from '@/hooks/outputs';
import { formatField } from '@/lib/format';

const OutputCard = ({
  data,
  dispatcher,
}: {
  data: [string, string];
  dispatcher: Function;
}) => {
  const [field, expr] = data;
  return (
    <div className="flex flex-col w-full p-4 border shadow-sm" key={field}>
      <div className="flex items-center justify-between">
        <div className="text-sm">{formatField(field)}</div>
        <XIcon
          className="h-5 text-red-500 cursor-pointer"
          onClick={(_) =>
            dispatcher({ type: OutputActions.delete, data: field })
          }
        />
      </div>
      <div className="flex flex-col mt-2">
        <div className="text-xs text-gray-400">Expression</div>
        <input
          type="text"
          placeholder="Expression"
          className="border h-8 px-2 text-sm border-gray-300"
          value={expr}
          onChange={(e) =>
            dispatcher({
              type: OutputActions.update,
              data: { [field]: e.target.value },
            })
          }
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

export default OutputCard;
