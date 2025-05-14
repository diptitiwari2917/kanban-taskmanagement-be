import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/axios";
import Button from "../../components/button";
import Label from "../../components/label";
import Input from "../../components/input";
import { useAuth } from "../../contexts/AuthContext";

interface IFormInput {
  email: string;
  password: string;
}

const resolver: Resolver<IFormInput> = async (values) => {
  return {
    values: values.email && values.password ? values : {},
    errors: !values.email
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

const Login = () => {
  const {login} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, e.g., show a message to the user
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#21212e] w-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#2c2c38] p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-3 bg-[#6462ca] text-white rounded-md hover:bg-[#5a57c9] transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </Button>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-[#6462ca] hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
