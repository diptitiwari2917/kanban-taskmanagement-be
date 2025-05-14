import { useForm, React } from "../../common";
import Button from "../button";
import { ModalProps } from "./types";
import Label from "../label";
import Input from "../input";

const AddNewBoard: React.FC<ModalProps> = ({
  closeModal,
  loading,
  onCreate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const onSubmit = (data: { name: string }) => {
    onCreate(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="dark:bg-gray-800 bg-white p-4 sm:p-6 rounded-lg w-[90%] sm:w-[400px] max-w-md">
        <h2 className="text-xl sm:text-2xl font-semibold dark:text-white text-gray-600 mb-3 sm:mb-4">
          Create New Board
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 sm:mb-4">
            <Label
              htmlFor="name"
              className="block dark:text-gray-400 text-gray-600 font-medium text-sm sm:text-base mb-1 sm:mb-2"
            >
              Board Name
            </Label>
            <Input
              id="name"
              type="text"
              register={register("name", { required: "Name is required" })}
              className="w-full p-1.5 sm:p-2 border dark:border-gray-600 border-gray-300 rounded-md dark:bg-gray-700 bg-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-white text-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base hover:bg-gray-100"
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-[#645fc6] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base hover:bg-[#8e8bcb]"
              disabled={loading}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBoard;
