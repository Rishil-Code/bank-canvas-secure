
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAuthApi, mockBankingApi } from "@/utils/mockData";
import { Loader2 } from "lucide-react";

const BalanceCard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const user = await mockAuthApi.getCurrentUser();
        if (user) {
          const userBalance = await mockBankingApi.getBalance(user.id);
          setBalance(userBalance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <Card className="hover-scale">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-muted-foreground">Your Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-16">
            <Loader2 className="h-6 w-6 text-bank-600 animate-spin" />
          </div>
        ) : (
          <div className="text-4xl font-bold text-bank-800">
            ${balance?.toFixed(2)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
