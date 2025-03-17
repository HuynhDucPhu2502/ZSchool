import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { UserLoginRequest } from "../../models";
import { AppDispatch } from "../../store";

import { Button } from "../../components/ui/button";
import { CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { loginUser } from "../../services/authService";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (user: UserLoginRequest) => {
      return dispatch(loginUser(user)).unwrap();
    },
    onSuccess: () => {
      navigate("/zschool");
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
          <Button
            type="submit"
            className={
              isPending ? "bg-blue-500/50" : "bg-blue-500 hover:bg-blue-600"
            }
            disabled={isPending ? true : false}
          >
            Đăng nhập{isPending && <span>...</span>}
          </Button>

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
  );
};

export default LoginForm;
