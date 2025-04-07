
import { useState, useEffect } from "react";
import { mockAuthApi, mockBankingApi, Transaction } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const user = await mockAuthApi.getCurrentUser();
        if (user) {
          const userTransactions = await mockBankingApi.getTransactions(user.id);
          setTransactions(userTransactions);
          setFilteredTransactions(userTransactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    // Apply filters
    let results = [...transactions];
    
    // Filter by type
    if (filter === "sent") {
      results = results.filter(t => t.senderId === mockAuthApi.currentUser?.id && t.type === 'transfer');
    } else if (filter === "received") {
      results = results.filter(t => t.receiverId === mockAuthApi.currentUser?.id && t.type === 'transfer');
    } else if (filter === "deposits") {
      results = results.filter(t => t.type === 'deposit');
    }
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(t => 
        t.description.toLowerCase().includes(searchLower) || 
        t.amount.toString().includes(searchLower)
      );
    }
    
    setFilteredTransactions(results);
  }, [search, filter, transactions]);

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select 
            value={filter} 
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="sent">Money Sent</SelectItem>
              <SelectItem value="received">Money Received</SelectItem>
              <SelectItem value="deposits">Deposits</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-bank-600 animate-spin" />
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => {
              const isOutgoing = transaction.senderId === mockAuthApi.currentUser?.id && 
                                transaction.senderId !== transaction.receiverId;
              
              return (
                <div 
                  key={transaction.id} 
                  className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'deposit' ? "bg-blue-100" :
                      isOutgoing ? "bg-red-100" : "bg-green-100"
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <ArrowDownIcon className="h-5 w-5 text-blue-500" />
                      ) : isOutgoing ? (
                        <ArrowUpIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5 text-green-500" />
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
                  <div className="flex flex-col items-end">
                    <div className={`font-semibold ${
                      transaction.type === 'deposit' ? "text-blue-500" :
                      isOutgoing ? "text-red-500" : "text-green-500"
                    }`}>
                      {isOutgoing ? "-" : "+"} ${transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No transactions found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
