import { React } from "../../common";
import { LabelProps } from "./types";

const Label: React.FC<LabelProps> = ({ className = "", children, htmlFor }) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
