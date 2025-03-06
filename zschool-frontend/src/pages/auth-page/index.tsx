import { useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "../../components/ui/button";
import { testFetch, testRefresh } from "../../services/authService";

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
