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
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signin, error: signinErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[350px] bg-[#080808] text-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {signinErrors.map((error, i) => (
                <p key={i} className="text-red-500">
                  {error}
                </p>
              ))}
              <CardFooter className="flex justify-between w-full p-0">
                <Link
                  to={"/register"}
                  type="button"
                  className="hover:text-slate-700 cursor-pointer"
                >
                  Dont have an account?
                  <br />
                  Register
                </Link>
                <Button type="submit" className="hover:bg-slate-700">
                  Login
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
