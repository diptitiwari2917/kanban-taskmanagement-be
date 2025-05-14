import { React } from "../../common.ts";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";
import { CardProps } from "./types.ts";
import Button from "../button/index.tsx";

const Card: React.FC<CardProps> = ({ id, title, subtitle, onDelete }) => {
  return (
    <div className="p-4 rounded-lg flex justify-between dark:bg-[#2c2c38] bg-gray-200">
      <div className="flex flex-col">
        <h3 className="font-semibold dark:text-white text-gray-600 text-[18px]">
          {title}
        </h3>
        <p className="text-sm text-gray-400"> {subtitle}</p>
      </div>
      <Button
        onClick={() => onDelete(id)}
        className="bg-transparent text-black dark:text-white"
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default Card;
