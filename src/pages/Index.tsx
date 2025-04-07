
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LockIcon, ShieldCheck, Wallet } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-bank-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row md:items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <Building2 className="h-8 w-8 text-bank-600" />
                <span className="ml-2 text-2xl font-bold text-bank-800">Engineering Bank</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bank-900">
                Secure Banking for Engineers
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                A modern banking experience designed with simplicity and security in mind.
              </p>
              <div className="space-x-4">
                <Button
                  size="lg"
                  className="bg-bank-600 hover:bg-bank-700"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-bank-600 text-bank-600 hover:bg-bank-50"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Test credentials: username <span className="font-mono bg-muted px-1">jaya</span>, password <span className="font-mono bg-muted px-1">ntr</span>
              </div>
            </div>
            <div className="md:w-1/2 md:flex md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3"
                alt="Secure Banking"
                className="rounded-xl shadow-lg max-w-full"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover-scale">
              <div className="bg-bank-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-bank-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Account Management</h3>
              <p className="text-gray-600">
                Create accounts, check balances, and manage your finances with ease.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover-scale">
              <div className="bg-bank-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-bank-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Transfers</h3>
              <p className="text-gray-600">
                Transfer funds to other users instantly with real-time balance updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover-scale">
              <div className="bg-bank-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-bank-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security First</h3>
              <p className="text-gray-600">
                Monitor all account activity and get alerts for any suspicious actions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-bank-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Join Engineering Bank today and experience a secure, modern banking platform.
          </p>
          <Button 
            size="lg"
            className="bg-bank-600 hover:bg-bank-700"
            onClick={() => navigate("/signup")}
          >
            Create Your Account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Building2 className="h-6 w-6 text-bank-600" />
              <span className="ml-2 text-lg font-semibold text-bank-800">Engineering Bank</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; 2025 Engineering Bank. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
