import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "../../components/ui/button";
import { CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { registerUser } from "../../services/authService";
import { UserRegistrationRequest } from "../../models";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle, SquareCheck } from "lucide-react";

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setTimeout(() => {
        formRef.current?.reset();
        navigate("/zschool/auth?mode=login");
      }, 3000);
    },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSuccess) {
      timeout = setTimeout(() => reset(), 60000);
    }

    return () => {
      if (isSuccess || timeout) clearTimeout(timeout);
    };
  }, [isSuccess, reset]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const userRegistrationRequest: UserRegistrationRequest = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    mutate(userRegistrationRequest);
  };

  return (
    <CardContent>
      <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
        <Input name="name" placeholder="Họ và tên" required />
        <Input name="username" placeholder="Tài khoản" required />
        <Input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          required
        />
        <div className="flex flex-col justify-center items-center space-y-4">
          {!isPending && (
            <Button
              type="submit"
              className="w-full lg:w-fit"
              variant="destructive"
            >
              Đăng Ký
            </Button>
          )}
          {isPending && (
            <Button
              type="button"
              className="w-full lg:w-fit"
              variant="destructive"
              disabled
            >
              Đăng Ký...
            </Button>
          )}
          <Link
            to="/zschool/auth?mode=login"
            className="border-b-2 border-transparent hover:border-gray-300 text-gray-500"
          >
            Chuyển Qua Đăng Nhập
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
      {isSuccess && (
        <Alert className="my-2 w-full" variant="success">
          <SquareCheck className="h-4 w-4" />
          <AlertTitle>Thành Công</AlertTitle>
          <AlertDescription>
            Đăng ký thành công
            <br />
            Vui lòng quay về trang đăng nhập để thực hiện đăng nhập.
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  );
};

export default RegisterForm;
