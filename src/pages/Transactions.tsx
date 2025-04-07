
import TransactionList from "@/components/Transactions/TransactionList";

const Transactions = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      <TransactionList />
    </div>
  );
};

export default Transactions;
