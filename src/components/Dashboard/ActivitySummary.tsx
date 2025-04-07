
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAuthApi, mockBankingApi, Transaction } from "@/utils/mockData";
import { ArrowDownIcon, ArrowUpIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ActivitySummary = () => {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const user = await mockAuthApi.getCurrentUser();
        if (user) {
          const transactions = await mockBankingApi.getTransactions(user.id);
          setRecentTransactions(transactions.slice(0, 3)); // Get only the 3 most recent transactions
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  return (
    <Card className="hover-scale">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg text-muted-foreground">Recent Activity</CardTitle>
        <Button 
          variant="ghost" 
          className="text-sm text-bank-600"
          onClick={() => navigate("/transactions")}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-6 w-6 text-bank-600 animate-spin" />
          </div>
        ) : recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => {
              const isOutgoing = transaction.senderId === mockAuthApi.currentUser?.id;
              
              return (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      isOutgoing ? "bg-red-100" : "bg-green-100"
                    }`}>
                      {isOutgoing ? (
                        <ArrowUpIcon className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(transaction.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    isOutgoing ? "text-red-500" : "text-green-500"
                  }`}>
                    {isOutgoing ? "-" : "+"} ${transaction.amount.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No recent transactions
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivitySummary;
