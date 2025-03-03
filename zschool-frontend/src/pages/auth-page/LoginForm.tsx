import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { UserLoginRequest } from "../../models";
import { AppDispatch } from "../../store";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { loginUser } from "../../store/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (user: UserLoginRequest) => {
      return dispatch(loginUser(user)).unwrap();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user: UserLoginRequest = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    mutate(user);
  };

  return (
    <Card className="min-h-[450px] w-2/3 lg:w-1/4 mx-auto my-12 py-4 px-8 border-2 border-gray-300 shadow-lg space-y-4 rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl text-blue-500">
          Đăng nhập
        </CardTitle>
        <CardDescription className="lg:text-lg">
          Học, học nữa, học mãi!!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="username" placeholder="Tài khoản" required />
          <Input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            required
          />
          <div className="flex flex-col justify-center items-center space-y-4">
            {isPending && (
              <Button type="button" disabled>
                Đăng nhập...
              </Button>
            )}
            {!isPending && (
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Đăng nhập
              </Button>
            )}

            <Link
              to="/zschool/auth?mode=register"
              className="border-b-2 border-transparent hover:border-gray-300 text-gray-500"
            >
              Chuyển Qua Đăng Ký
            </Link>
          </div>
        </form>
        {isError && (
          <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
