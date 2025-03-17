import { useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode: string = searchParams.get("mode") || "login";

  const formHeaderInfo: {
    title: string;
    description: string;
    titleStyle: string;
  }[] = [
    {
      title: "Đăng ký",
      description: "Tham gia môi trường giáo dục lành mạnh ngay hôm nay",
      titleStyle: "text-red-500",
    },
    {
      title: "Đăng nhập",
      description: "Học, học nữa, học mãi!!",
      titleStyle: "text-blue-500",
    },
  ];

  const selectedHeaderInfo =
    mode === "register" ? formHeaderInfo[0] : formHeaderInfo[1];

  return (
    <div className="min-h-[600px] flex justify-center items-center">
      <Card
        className="min-h-[450px] w-2/3 lg:w-1/4 mx-auto my-12 py-4 px-8 
        border-2 border-gray-300 shadow-lg space-y-4 rounded-lg"
      >
        <CardHeader>
          <CardTitle
            className={`text-lg lg:text-2xl ${selectedHeaderInfo.titleStyle}`}
          >
            {selectedHeaderInfo.title}
          </CardTitle>
          <CardDescription className="lg:text-lg">
            {selectedHeaderInfo.description}
          </CardDescription>
        </CardHeader>

        {mode === "login" && <LoginForm />}
        {mode === "register" && <RegisterForm />}
      </Card>
    </div>
  );
};

export default AuthPage;
