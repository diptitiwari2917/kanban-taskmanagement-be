import { React } from "../../common";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  register,
  className = "",
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <input
        id={id}
        type={type}
        {...register}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
