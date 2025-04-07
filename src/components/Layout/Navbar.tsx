
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  LogOut,
  Menu,
  ShieldCheck,
  User,
  Wallet,
  X,
  ArrowLeftRight,
  Clock
} from "lucide-react";
import { mockAuthApi } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await mockAuthApi.getCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await mockAuthApi.logout();
      toast({
        title: "Logged out successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error logging out",
      });
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Wallet className="h-5 w-5 mr-2" />,
    },
    {
      name: "Transfer",
      path: "/transfer",
      icon: <ArrowLeftRight className="h-5 w-5 mr-2" />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <Clock className="h-5 w-5 mr-2" />,
    },
    {
      name: "Security",
      path: "/security",
      icon: <ShieldCheck className="h-5 w-5 mr-2" />,
    },
  ];

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white shadow-md dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-bank-600" />
              <span className="ml-2 text-xl font-bold text-bank-800">EngBank</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {username && (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                        location.pathname === item.path
                          ? "bg-bank-50 text-bank-700"
                          : "text-gray-600 hover:bg-bank-50 hover:text-bank-700"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  <div className="ml-4 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-bank-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-1" /> Sign Out
                    </Button>
                  </div>
                </>
              )}
              {!username && (
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-bank-700"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-bank-600 hover:bg-bank-700 text-white"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {username && (
              <div className="flex items-center mr-4">
                <User className="h-5 w-5 text-bank-600 mr-1" />
                <span className="text-sm font-medium text-bank-800">{username}</span>
              </div>
            )}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-bank-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {username ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? "bg-bank-50 text-bank-700"
                        : "text-gray-600 hover:bg-bank-50 hover:text-bank-700"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                <button
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-bank-50 hover:text-bank-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/login")}
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
                <Button
                  className="w-full justify-start bg-bank-600 hover:bg-bank-700 text-white"
                  onClick={() => navigate("/signup")}
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
