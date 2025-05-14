import { useForm, SubmitHandler, React } from "../../common";
import Button from "../button";
import { AddNewTaskProps } from "./types";
import Label from "../label";
import Input from "../input";

const AddNewTask: React.FC<AddNewTaskProps> = ({
  closeModal,
  onCreate,
  task,
}) => {
  const { register, handleSubmit } = useForm();

  const submitHandler: SubmitHandler<Record<string, string>> = (data) => {
    onCreate({ ...data });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="dark:bg-[#21212e] bg-white p-4 sm:p-6 rounded-lg w-[90%] sm:w-[480px] max-w-lg">
        <h2 className="text-xl sm:text-2xl font-semibold dark:text-white text-gray-600 mb-3 sm:mb-4">
          {task ? "Add New Task" : "Add New Column"}
        </h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3 sm:mb-4">
            <Label className="block dark:text-gray-400 text-gray-600 font-medium text-sm sm:text-base mb-1 sm:mb-2">
              Title
            </Label>
            <Input
              type="text"
              register={register("name", { required: true })}
              className="w-full p-1.5 sm:p-2 border dark:border-gray-600 border-gray-300 rounded-md dark:bg-gray-500 bg-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <Label className="block dark:text-gray-400 text-gray-600 font-medium text-sm sm:text-base mb-1 sm:mb-2">
              Description
            </Label>
            <Input
              type="text"
              register={register("description")}
              className="w-full p-1.5 sm:p-2 border dark:border-gray-600 border-gray-300 rounded-md dark:bg-gray-500 bg-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
          </div>
          <div className="flex justify-end gap-2 mt-3 sm:mt-4">
            <Button
              type="button"
              onClick={closeModal}
              className="bg-white text-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base hover:bg-gray-100 transition duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#645fc6] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base hover:bg-[#8e8bcb] transition duration-300"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
