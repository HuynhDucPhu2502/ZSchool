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
      <Button
        onClick={testFetch}
        type="button"
        className="w-full lg:w-fit"
        variant="destructive"
      >
        Test Fetch
      </Button>
      <Button
        onClick={testRefresh}
        type="button"
        className="w-full lg:w-fit"
        variant="destructive"
      >
        Test Refresh
      </Button>
    </div>
  );
};

export default AuthPage;
