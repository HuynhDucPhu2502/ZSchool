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

const LoginForm = () => {
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
        <form className="space-y-4">
          <Input name="username" placeholder="Tài khoản" required />
          <Input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            required
          />
          <div className="flex flex-col justify-center items-center space-y-4">
            <Button type="submit" className="w-full lg:w-fit" variant="blue">
              Đăng nhập
            </Button>

            <Link
              to="/zschool/auth?mode=register"
              className="border-b-2 border-transparent hover:border-gray-300 text-gray-500"
            >
              Chuyển Qua Đăng Ký
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
