import { React } from "../../common";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className = "",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      className={`transition duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
