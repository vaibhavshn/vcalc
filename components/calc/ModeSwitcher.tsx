enum ViewModes {
  normal,
  sheet,
}

const ModeSwitcher = ({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewModes;
  setViewMode: Function;
}) => {
  return (
    <div className="inline-flex bg-gray-100 border-l-2 rounded-lg overflow-hidden p-1 border-2 border-gray-300">
      <button
        className={`px-4 py-2 cursor-pointer rounded-lg focus:outline-none ${
          viewMode === ViewModes.normal ? 'bg-white shadow-lg ' : ''
        }`}
        onClick={(_) => setViewMode(ViewModes.normal)}
      >
        Normal
      </button>
      <button
        className={`px-4 py-2 cursor-pointer rounded-lg focus:outline-none ${
          viewMode === ViewModes.sheet ? 'bg-white shadow-lg ' : ''
        }`}
        onClick={(_) => setViewMode(ViewModes.sheet)}
      >
        Sheet
      </button>
    </div>
  );
};

export default ModeSwitcher;
export { ViewModes };
