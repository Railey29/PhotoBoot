import useDarkMode from "@/hooks/useDarkMode";
import PhotoModeComponents from "@/components/PhotoModeComponents";
const ChangeModeComponents = () => {
  const { darkMode, toggleMode } = useDarkMode();

  return (
    <div
      className={`flex justify-center items-start h-screen w-full ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <PhotoModeComponents />
      <div className="absolute top-8 lg:right-10 md:right-10 sm:right-10">
        <input
          id="switch"
          type="checkbox"
          onChange={toggleMode}
          className="hidden"
        />
        <label htmlFor="switch" className="flex items-center cursor-pointer">
          <div
            className={`w-16 h-8 rounded-full relative ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform ${
                darkMode ? "translate-x-8" : ""
              }`}
            ></div>
          </div>
          <div className="flex justify-between w-20 ml-4">
            <p className={`${darkMode ? "text-gray-400" : "text-black"}`}>
              Light
            </p>
            <p className={`${darkMode ? "text-white" : "text-gray-400"}`}>
              Dark
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ChangeModeComponents;
