import { useEffect, useState, React } from "../../common.ts";
import { api } from "../../services/axios/index.tsx";
import Toggle from "../toggle/index.tsx";
import { SubmitHandler } from "react-hook-form";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";
import { IFormInput, NavItem, SidebarProps } from "./types";
import BoardIcon from "../../assets/icons/boardIcon.svg";
import Button from "../button/index.tsx";
import { AddNewBoard } from "../index.ts";
import SidebarMenuIcon from "../../assets/icons/sidebarMenu.svg";
import SidebarCloseIcon from "../../assets/icons/sidebarCloseIcon.svg";

const Sidebar: React.FC<SidebarProps> = ({ boardId, setBoardId }) => {
  const [sideBarItems, setSideBarItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchBoards = async () => {
    try {
      const response = await api.get("/boards");
      const boards = response.data;
      setSideBarItems(boards);
    } catch (err) {
      console.error("Failed to fetch boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleAddNewBoard = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createBoard: SubmitHandler<IFormInput> = async (data) => {
    try {
      await api.post("/boards", { title: data.name });
      await fetchBoards();
      closeModal();
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  const deleteBoard = async (id: number) => {
    try {
      await api.delete(`/boards/${id}`);
      await fetchBoards();
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <>
      {!isSidebarOpen && (
        <Button
          className="fixed top-4 left-4 z-50 p-2 bg-transparent text-black dark:text-white rounded-md sm:hidden"
          onClick={toggleSidebar}
        >
          <SidebarCloseIcon />
        </Button>
      )}

      <div
        className={`fixed inset-y-0 justify-between left-0 z-40 w-64 bg-white dark:bg-[#2c2c38] text-white border-r dark:border-gray-700 border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static sm:min-h-screen`}
      >
        <div>
          <div className="space-y-4 py-4 pl-3">
            <div className="flex items-center gap-1 justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded"></div>
                  <div className="w-1 h-5 bg-gradient-to-b from-purple-500/70 to-indigo-500/70 rounded"></div>
                </div>
                <h1 className="ml-2 text-2xl font-bold dark:text-white text-gray-600">
                  kanban
                </h1>
              </div>
              <div className="flex items-center">
                <Button
                  className="p-2 bg-transparent sm:hidden text-black dark:text-white rounded-md"
                  onClick={toggleSidebar}
                >
                  <SidebarMenuIcon />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex pr-3 flex-col gap-4 mt-4">
            <h2 className="dark:text-gray-400 text-gray-600 font-semibold text-sm mb-2 px-3">
              ALL BOARDS ({sideBarItems.length})
            </h2>
            <ul className="w-full flex flex-col gap-3">
              {sideBarItems.map((item, index) => (
                <li key={index}>
                  <span
                    className={`flex justify-between items-center p-2 rounded-tr-full rounded-br-full cursor-pointer ${
                      item.id.toString() === boardId
                        ? "text-white dark:text-white bg-[#645fc6]"
                        : "text-gray-600 dark:text-slate-400 hover:text-[#645fc6]"
                    }`}
                    onClick={() => {
                      setBoardId(item.id.toString());
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      <BoardIcon />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBoard(item.id);
                      }}
                      className="bg-transparent text-black dark:text-white p-1"
                    >
                      <DeleteIcon />
                    </Button>
                  </span>
                </li>
              ))}
              <li>
                <Button
                  className="flex items-center p-2 w-full text-[#625fc8] rounded-tr-full rounded-br-full bg-transparent border-0 outline-none focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    handleAddNewBoard();
                    setIsSidebarOpen(false);
                  }}
                >
                  <BoardIcon />
                  <p>+ Create New Board</p>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4">
          <Toggle />
        </div>
      </div>
      {isModalOpen && (
        <AddNewBoard
          closeModal={() => {
            closeModal();
            setIsSidebarOpen(false);
          }}
          loading={loading}
          onCreate={createBoard}
        />
      )}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
