
import { useEffect } from "react";
import BalanceCard from "@/components/Dashboard/BalanceCard";
import ActivitySummary from "@/components/Dashboard/ActivitySummary";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mockAuthApi } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{greeting}, {mockAuthApi.currentUser?.username}!</h1>
      <p className="text-muted-foreground mb-8">Here's a summary of your account</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <BalanceCard />
        <ActivitySummary />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-between bg-bank-600 hover:bg-bank-700"
                onClick={() => navigate('/transfer')}
              >
                Send Money
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                className="w-full justify-between"
                variant="outline"
                onClick={() => navigate('/transactions')}
              >
                View Transactions
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                className="w-full justify-between"
                variant="outline"
                onClick={() => navigate('/security')}
              >
                Security Logs
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-md flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Account Security: Strong</h3>
                  <p className="text-sm text-green-700">Your account security is up to date.</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-md flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">Last Login: Now</h3>
                  <p className="text-sm text-blue-700">Your account was accessed from your usual location.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
