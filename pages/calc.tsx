import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorIcon, SunIcon } from '@heroicons/react/outline';

import { formatField } from '@/lib/format';
import useCalc from '@/hooks/calc';

export default function CalcPage() {
  const { hash, loaded, results, setHash, handleSubmit } = useCalc();

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto p-6 space-y-2">
        <h1 className="text-3xl font-bold">
          {hash && hash.title ? hash.title : 'VCalc'}
        </h1>
        <p className="text-sm">
          {hash && hash.desc ? hash.desc : 'Design your calculator'}
        </p>
      </div>
      {!loaded && (
        <motion.div
          layout
          key="loadingIndicator"
          exit={{ y: -100, opacity: 0.4 }}
        >
          <div className="flex flex-col space-y-4 items-center justify-center my-12">
            <SunIcon className="h-16 duration-500 animate-spin text-gray-700" />
            <p className="text-xl font-light">Loading...</p>
          </div>
        </motion.div>
      )}
      {loaded && (
        <motion.main
          layout
          key="calculator"
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div
            className={`grid grid-cols-1 ${
              results ? 'md:grid-cols-2 max-w-4xl' : 'max-w-lg'
            } gap-4 md:gap-0 w-full mx-auto p-6`}
          >
            {!hash && (
              <div className="flex flex-col space-y-4 my-6">
                <CalculatorIcon className="h-28 text-gray-500" />
                <div className="text-center font-light text-gray-700">
                  <p>Uh Oh!</p>
                  <p>The link you entered is invalid.</p>
                  <div className="my-6">
                    <a
                      href="/"
                      className="w-full px-8 py-3 bg-pink-700 text-pink-100 rounded-lg transition hover:shadow-xl"
                    >
                      Create a new Calc
                    </a>
                  </div>
                </div>
              </div>
            )}
            {hash && 'inputs' in hash && (
              <motion.div layout key="calculatorForm">
                <form
                  className="flex flex-col h-full space-y-3 p-4 border bg-white"
                  onSubmit={handleSubmit}
                >
                  {Object.entries(hash.inputs).map(([field, value]) => (
                    <div className="flex flex-col" key={field}>
                      <label htmlFor="">{formatField(field)}</label>
                      <input
                        type="text"
                        value={value}
                        placeholder={formatField(field)}
                        onChange={(e) => {
                          const inputs = Object.assign({}, hash.inputs, {
                            [field]: e.target.value,
                          });
                          setHash(Object.assign({}, hash, { inputs }));
                        }}
                      />
                    </div>
                  ))}
                  <button className="py-2 font-light uppercase border">
                    Calculate
                  </button>
                </form>
              </motion.div>
            )}
            {results && (
              <motion.div layout key="calculatorResult">
                <div className="h-full p-4 bg-gradient-to-br from-gray-900 to-gray-700 text-gray-200 space-y-3">
                  {Object.entries(results).map(
                    ([field, data]: [field: string, data: any]) => (
                      <div key={field}>
                        <div className="text-sm font-light">
                          {formatField(field)}
                        </div>
                        <div
                          className={`h-8 text-lg font-bold ${
                            data.error ? 'text-red-500' : 'text-gray-100'
                          }`}
                        >
                          {data.error ?? data.value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.main>
      )}
    </div>
  );
}
