import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signup,
    isAuthenticated,
    error,
    setError: setContextError,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  useEffect(() => {
    return () => setContextError([]);
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[350px] bg-[#080808] text-white">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error.map((err, i) => (
                <p key={i} className="text-red-500 ">
                  {err}
                </p>
              ))}
              <CardFooter className="flex justify-between w-ful p-0">
                <Button type="submit" className="hover:bg-slate-700 ">
                  Register
                </Button>
                <Link
                  to={"/login"}
                  className="hover:text-slate-700 cursor-pointer"
                >
                  Already have an account?
                  <br />
                  Login
                </Link>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
