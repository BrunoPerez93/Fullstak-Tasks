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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginRequest } from "@/api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    await loginRequest(values);
    navigate("/");
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
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
              <CardFooter className="flex justify-between w-full p-0">
                <Button
                  type="button"
                  className="hover:bg-slate-700"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
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
