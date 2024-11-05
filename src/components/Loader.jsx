const Loader = () => (
  <div className="flex items-center justify-center h-full absolute top-96">
    <div className="loader text-lg font-semibold text-gray-200 animate-pulse">
      <span className="mr-2">Cargando...</span>
      <div className="loader-dot animate-ping inline-block w-3 h-3 rounded-full bg-slate-50"></div>
    </div>
  </div>
);

export default Loader;
