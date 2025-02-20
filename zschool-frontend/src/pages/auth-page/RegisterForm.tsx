import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/UserAPI";
import { UserRegistrationRequest } from "../../models";

const RegisterForm = () => {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: registerUser,
  });

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
    <Card className="min-h-[450px] w-2/3 lg:w-1/4 mx-auto my-12 py-4 px-8 border-2 border-gray-300 shadow-lg space-y-4 rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl text-red-500">
          Đăng Ký
        </CardTitle>
        <CardDescription className="lg:text-lg">
          Tham gia môi trường giáo dục lành mạnh ngay hôm nay
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onClick={handleSubmit}>
          <Input name="name" placeholder="Họ và tên" required />
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
              className="w-full lg:w-fit"
              variant="destructive"
            >
              Đăng Ký
            </Button>
            <Link
              to="/zschool/auth?mode=login"
              className="border-b-2 border-transparent hover:border-gray-300 text-gray-500"
            >
              Chuyển Qua Đăng Nhập
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
