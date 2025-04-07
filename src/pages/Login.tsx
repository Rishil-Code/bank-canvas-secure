
import { Link } from "react-router-dom";
import LoginForm from "@/components/Auth/LoginForm";
import { Building2 } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bank-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center">
            <Building2 className="h-8 w-8 text-bank-600" />
            <span className="ml-2 text-2xl font-bold text-bank-800">Engineering Bank</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
