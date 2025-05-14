import { useEffect, useState } from "../../common";
import LightmodeIcon from "../../assets/icons/lightmodeIcon.svg";
import DarkmodeIcon from "../../assets/icons/darkmodeIcon.svg";

const Toggle = () => {
  const [status, setStatus] = useState(true);

  const handleToggle = () => {
    const newStatus = !status;
    setStatus(newStatus);
    if (newStatus) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (status) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-4 bg-gray-200 dark:bg-[#21212e] p-2 rounded-md w-56 mx-auto my-5">
      <LightmodeIcon />
      <label
        className={`relative inline-block w-12 h-[26px] rounded-full transition duration-300 cursor-pointer ${
          status ? "bg-[#6161c9]" : "bg-gray-400"
        }`}
      >
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={status}
          onChange={handleToggle}
        />
        <span
          className="absolute h-[19px] w-[19px] bg-white rounded-full transition duration-300"
          style={{
            left: status ? "25px" : "4px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        ></span>
      </label>
      <DarkmodeIcon />
    </div>
  );
};

export default Toggle;