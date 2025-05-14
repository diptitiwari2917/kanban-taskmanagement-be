import { useEffect, useState } from "../../common";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Card from "../../components/card";
import { api } from "../../services/axios";
import AddNewTask from "../../components/addNewTask";
import Button from "../../components/button";

const Dashboard = () => {
  const [boardId, setBoardId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async (columnId: string) => {
    console.log("test====");
    
    try {
      const response = await api.get(`/tasks/column/${columnId}`);
      setTasks(response.data);
    } catch (err) {
      setTasks([]);
      console.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchColumns = async (boardId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/columns/board/${boardId}`);
      setColumns(response.data);
    } catch (error) {
      console.error("Failed to fetch columns:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number, columnId: number) => {
    try {
      await api.delete(`/tasks/${id}?columnId=${columnId}`);
      if (boardId) {
        fetchTasks(boardId);
      }
    } catch (err) {
      console.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boardId) {
      setTasks([]);
      setColumns([]);
      fetchTasks(boardId);
      fetchColumns(boardId);
    }
  }, [boardId]);

  const handleAddNewColumn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createColumn = async (taskData: any) => {
    if (!boardId) return;
    try {
      await api.post(`/columns`, { ...taskData, boardId: parseInt(boardId) });

      boardId && (await fetchTasks(boardId));
      closeModal();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="flex w-screen min-h-screen">
      <Sidebar boardId={boardId} setBoardId={setBoardId} />

      <div className="flex flex-col w-full lg:w-[calc(100%-16rem)]">
        <Header
          boardId={boardId?.toString()}
          columns={columns}
          fetchTasks={() => fetchTasks(boardId)}
        />
        {!boardId && (
          <span className="flex-1 dark:bg-[#21212e] bg-white flex justify-center items-center text-gray-400 text-lg sm:text-xl">
            Please Select a Board
          </span>
        )}
        {boardId && (
          <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-[#21212e] flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {columns?.map((taskGroup) => (
                <div key={taskGroup.columnId} className="min-h-[200px]">
                  <div className="flex gap-2 sm:gap-3 items-center mb-3 sm:mb-4">
                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#545b68] truncate">
                      {taskGroup.name} ({taskGroup.tasks?.length})
                    </h2>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {taskGroup.tasks?.map(
                      (item: {
                        id: number;
                        title: string;
                        description: string;
                      }) => (
                        <div key={item.id} className="cursor-move">
                          <Card
                            id={item.id}
                            title={item.title}
                            subtitle={item.description}
                            onDelete={() =>
                              deleteTask(item.id, taskGroup.columnId)
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddNewColumn}
                className="flex justify-center items-center text-[#818c9f] font-semibold text-lg sm:text-xl bg-gray-200 dark:bg-[#2c2c38] mt-6 sm:mt-8 py-4 sm:py-6 rounded-lg border-0 outline-none focus:outline-none hover:bg-gray-300 dark:hover:bg-[#3a3a4a] transition-colors"
              >
                + New Column
              </Button>
            </div>
          </div>
        )}
      </div>
      {boardId && isModalOpen && (
        <AddNewTask
          closeModal={closeModal}
          loading={loading}
          onCreate={createColumn}
          columns={[]}
        />
      )}
    </div>
  );
};

export default Dashboard;
