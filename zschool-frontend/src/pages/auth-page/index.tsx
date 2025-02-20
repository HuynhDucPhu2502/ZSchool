import { useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode: string = searchParams.get("mode") || "login";

  return (
    <div className="min-h-[600px] flex justify-center items-center">
      {mode === "login" && <LoginForm />}
      {mode === "register" && <RegisterForm />}
    </div>
  );
};

export default AuthPage;
