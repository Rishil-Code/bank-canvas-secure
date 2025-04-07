
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAuthApi, mockBankingApi } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";
import { CircleDollarSign, Loader2, SendIcon } from "lucide-react";

const TransferForm = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setIsBalanceLoading(true);
      try {
        const user = await mockAuthApi.getCurrentUser();
        if (user) {
          const userBalance = await mockBankingApi.getBalance(user.id);
          setBalance(userBalance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setIsBalanceLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await mockAuthApi.getCurrentUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "You need to be logged in to make transfers.",
        });
        return;
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          variant: "destructive",
          title: "Invalid Amount",
          description: "Please enter a valid amount.",
        });
        return;
      }

      await mockBankingApi.transferFunds(
        user.id,
        formData.recipient,
        amount,
        formData.description || "Transfer"
      );

      // Update balance after transfer
      const updatedBalance = await mockBankingApi.getBalance(user.id);
      setBalance(updatedBalance);

      // Reset form
      setFormData({
        recipient: "",
        amount: "",
        description: "",
      });

    } catch (error: any) {
      console.error("Transfer error:", error);
      // Error handling is done in the mockBankingApi
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SendIcon className="h-5 w-5" />
          Transfer Funds
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="bg-bank-50 p-4 rounded-md flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              {isBalanceLoading ? (
                <div className="flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <p className="text-xl font-semibold">${balance?.toFixed(2)}</p>
              )}
            </div>
            <CircleDollarSign className="h-10 w-10 text-bank-600 opacity-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Username</Label>
            <Input
              id="recipient"
              name="recipient"
              placeholder="Enter username"
              value={formData.recipient}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Hint: You can transfer to "alex" or "sarah"
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-7"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="What's this for?"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isBalanceLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Send Money"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransferForm;
