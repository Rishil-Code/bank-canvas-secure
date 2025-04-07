
import { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockAuthApi } from "@/utils/mockData";
import { Loader2 } from "lucide-react";

interface AuthWrapperProps {
  children: ReactNode;
}

const publicRoutes = ["/", "/login", "/signup"];

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isPublicRoute = publicRoutes.includes(location.pathname);
        const user = await mockAuthApi.getCurrentUser();
        
        if (!user && !isPublicRoute) {
          // Not authenticated and trying to access protected route
          navigate("/login");
        } else if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
          // Already authenticated and trying to access login/signup
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-bank-600 animate-spin" />
        <p className="mt-2 text-bank-600">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
