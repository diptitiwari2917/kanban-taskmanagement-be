import { React, useState } from "../../common";
import AddNewTask from "../addNewTask";
import { api } from "../../services/axios";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../button";
import { HeaderProps } from "./types";
import LogoutIcon from "../../assets/icons/logoutIcon.svg";

const Header: React.FC<HeaderProps> = ({ fetchTasks, columns, boardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  const handleAddNewTask = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createTask = async (data: any) => {
    try {
      await api.post(`tasks`, {
        title: data.name,
        description: data.description,
        boardId: Number(boardId),
      });
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center sm:p-4 dark:bg-[#2c2c38] bg-white p-4 pl-20 border-b dark:border-gray-700">
        <h1 className="text-lg font-semibold md:text-[22px] text-[16px] dark:text-white text-gray-600">
          Platform Launch
        </h1>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            className="bg-[#625fc8] text-white  md:px-3 md:py-2 p-2 rounded-full"
            onClick={handleAddNewTask}
          >
            <p className="md:text-[18px] text-[12px]">+ Add New Task</p>
          </Button>
          <Button
            className="bg-transparent border-0 outline-none focus:outline-none text-gray-600 dark:text-white"
            onClick={() => logout()}
          >
            <LogoutIcon />
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <AddNewTask
          closeModal={closeModal}
          onCreate={createTask}
          columns={columns}
          task={true}
        />
      )}
    </>
  );
};

export default Header;
