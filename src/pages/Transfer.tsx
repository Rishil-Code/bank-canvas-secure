
import TransferForm from "@/components/Transfer/TransferForm";

const Transfer = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transfer Funds</h1>
      <div className="flex justify-center md:justify-start">
        <TransferForm />
      </div>
    </div>
  );
};

export default Transfer;
