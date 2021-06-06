import { useRef } from 'react';

import useCreator from '@/hooks/creator';
import InputsView from '@/components/InputsView';
import OutputsView from '@/components/OutputsView';
import { getHash } from '@/lib/translate';

export default function Creator() {
  const {
    inputs,
    dispatchInputs,
    outputs,
    dispatchOutputs,
    variableExists,
    clearAll,
  } = useCreator();

  const titleRef = useRef<HTMLInputElement>(null),
    descRef = useRef<HTMLDivElement>(null);

  const getMetaData = () => {
    let title: string = titleRef.current?.value ?? 'VCalc';
    let desc: string = descRef.current?.innerText ?? 'A dynamic calculator';
    if (title === '') title = 'VCalc';
    if (desc === '') desc = 'A dynamic calculator';
    return { title, desc };
  };

  const isEmpty = () => {
    return (
      Object.keys(inputs).length === 0 || Object.keys(outputs).length === 0
    );
  };

  const preview = () => {
    const metaData = getMetaData();
    const hash = getHash({ ...metaData, inputs, outputs });
    if (isEmpty())
      alert("The calculator fields aren't loaded properly, try again.");
    else window.open(`/calc#${hash}`, '_blank');
  };

  return (
    <div>
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 my-6 space-y-2">
        <input
          type="text"
          defaultValue="VCalc"
          placeholder="Title"
          className="w-full text-5xl text-center tracking-tighter font-bold mx-auto border-2 border-transparent outline-none hover:border-gray-400 hover:border-dashed focus:border-gray-400 focus:border-dashed focus:ring-0"
          ref={titleRef}
        />
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="w-full py-4 text-center font-light mx-auto border-2 border-transparent outline-none hover:border-gray-400 hover:border-dashed focus:border-gray-400 focus:border-dashed focus:ring-0"
          ref={descRef}
        >
          Design your calculator
        </div>
      </div>

      <div className="flex items-center justify-between my-6 p-6">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md mx-auto block text-sm"
          onClick={(_) => clearAll()}
        >
          Clear All
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md mx-auto block text-sm"
          onClick={(_) => preview()}
        >
          Preview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto p-6">
        <InputsView
          inputs={inputs}
          dispatcher={dispatchInputs}
          variableExists={variableExists}
        />
        <OutputsView
          outputs={outputs}
          dispatcher={dispatchOutputs}
          variableExists={variableExists}
        />
      </div>
    </div>
  );
}
