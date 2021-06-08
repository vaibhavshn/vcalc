import { Inputs } from '@/hooks/inputs';
import { CalcResult } from '@/lib/calc';

const NormalView = ({
  inputs,
  setInputs,
  handleSubmit,
  results,
}: {
  inputs: Inputs;
  setInputs: Function;
  handleSubmit: Function;
  results: Record<string, CalcResult> | null;
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <form
        className="flex-1 bg-white p-4 space-y-4"
        onSubmit={(_) => handleSubmit()}
      >
        {Object.entries(inputs).map(([field, value]) => (
          <div
            className="flex flex-col space-y-1"
            key={`normalView-input-${field}`}
          >
            <label className="text-sm">{field}</label>
            <input
              type="text"
              className="border p-2"
              placeholder={field}
              value={value}
              onChange={(e) => {
                setInputs(
                  Object.assign({}, inputs, {
                    [field]: e.target.value,
                  })
                );
              }}
            />
          </div>
        ))}
        <button className="w-full py-2 font-light border shadow-sm rounded-md">
          Calculate
        </button>
      </form>
      <div className="flex-1 p-4 text-gray-400 bg-gray-900 space-y-2">
        {results &&
          Object.entries(results).map(([field, data]) => (
            <div className="flex flex-col" key={`normalView-result-${field}`}>
              <label className="text-sm">{field}</label>
              <div
                className={`w-full text-lg font-medium ${
                  data.error ? 'text-red-500' : 'text-white'
                }`}
              >
                {data.error ?? data.value}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NormalView;
