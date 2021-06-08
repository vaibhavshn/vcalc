import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ModeSwitcher, { ViewModes } from './ModeSwitcher';
import SheetView from './SheetView';
import NormalView from './NormalView';

import { HashObject } from '@/lib/translate';
import { useNormalCalc, useSheetCalc } from '@/hooks/calc';

const Header = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="px-4 py-12 text-center space-y-6">
      <h1 className="text-3xl font-bold">
        {title.length == 0 ? 'VCalc' : title}
      </h1>
      <p className="text-gray-700">
        {desc.length == 0 ? 'A dynamic calculator' : desc}
      </p>
    </div>
  );
};

const Calculator = ({ hash }: { hash: HashObject }) => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.sheet);
  const normalCalc = useNormalCalc(hash);
  const sheetCalc = useSheetCalc(hash);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="flex flex-col w-full mx-auto rounded-lg overflow-hidden">
        <div className="space-y-2 p-4 text-sm">
          <Header title={hash.title ?? ''} desc={hash.desc ?? ''} />
          <ModeSwitcher viewMode={viewMode} setViewMode={setViewMode} />
          {viewMode === ViewModes.sheet && (
            <AnimatePresence>
              <motion.div
                layout
                key="sheetView"
                initial={{ x: -100, opacity: 0.2 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              >
                <SheetView {...sheetCalc} />
              </motion.div>
            </AnimatePresence>
          )}
          {viewMode === ViewModes.normal && (
            <AnimatePresence>
              <motion.div
                layout
                key="normalView"
                initial={{ x: 100, opacity: 0.2 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              >
                <NormalView {...normalCalc} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
