import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/axios";
import Button from "../../components/button";
import Input from "../../components/input";
import Label from "../../components/label";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const resolver: Resolver<IFormInput> = async (values) => {
  return {
    values: values.username && values.email && values.password ? values : {},
    errors: !values.username
      ? {
          username: {
            type: "required",
            message: "Username is required",
          },
        }
      : !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required",
          },
        }
      : !/\S+@\S+\.\S+/.test(values.email)
      ? {
          email: {
            type: "pattern",
            message: "Email is not valid",
          },
        }
      : !values.password
      ? {
          password: {
            type: "required",
            message: "Password is required",
          },
        }
      : {},
  };
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const response = await api.post("/auth/signup", data);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#21212e] w-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#2c2c38] p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Register
        </h2>
        <div className="space-y-1">
          <Label htmlFor="name" className="block text-gray-400 font-medium">
            Name
          </Label>
          <Input
            id="username"
            type="text"
            register={register("username")}
            className={`w-full p-3 border ${
              errors.username ? "border-red-500" : "border-gray-600"
            } rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.username ? "focus:ring-red-500" : "focus:ring-indigo-500"
            }`}
            placeholder="Enter your User Name"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="block text-gray-400 font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            register={register("email")}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-600"
            } rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-indigo-500"
            }`}
            placeholder="Enter your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="block text-gray-400 font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            register={register("password")}
            className={`w-full p-3 border ${
              errors.password ? "border-red-500" : "border-gray-600"
            } rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-500" : "focus:ring-indigo-500"
            }`}
            placeholder="Enter your Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 bg-[#6462ca] text-white rounded-md hover:bg-[#5a57c9] transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
