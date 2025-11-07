import React from 'react';
import { StatementData, Transaction } from '../types';
import { DownloadIcon } from './icons';

interface StatementDisplayProps {
  data: StatementData;
  fileName: string;
}

interface SummaryItemProps {
  label: string;
  value: string | number;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-400">{label}</p>
    <p className="text-lg font-semibold text-slate-100">{value}</p>
  </div>
);

const TransactionTableRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <tr className="border-b border-slate-700 hover:bg-slate-700/50">
    <td className="p-3 text-sm text-slate-300 whitespace-nowrap">{transaction.date}</td>
    <td className="p-3 text-sm text-slate-300">{transaction.description}</td>
    <td className="p-3 text-sm text-slate-300 text-right font-mono whitespace-nowrap">
      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(transaction.amount)}
    </td>
  </tr>
);


const StatementDisplay: React.FC<StatementDisplayProps> = ({ data, fileName }) => {

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${fileName.replace('.pdf', '')}_data.json`;
    link.click();
  };

  return (
    <div className="w-full p-6 sm:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Extracted Data</h2>
           <p className="text-sm text-slate-400 mt-1">Summary from {fileName}</p>
        </div>
        <button
          onClick={handleDownloadJson}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <DownloadIcon className="w-5 h-5" />
          Download JSON
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
        <SummaryItem label="Card Type" value={data.cardType} />
        <SummaryItem label="Last 4 Digits" value={`**** ${data.cardLastFourDigits}`} />
        <SummaryItem label="Billing Cycle" value={data.billingCycle} />
        <SummaryItem label="Payment Due Date" value={data.paymentDueDate} />
        <div className="col-span-2">
            <p className="text-sm text-slate-400">Total Due</p>
            <p className="text-2xl font-bold text-cyan-400">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(data.totalDues)}
            </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-4">Transactions</h3>
      <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700 max-h-60">
        <table className="w-full text-left">
          <thead className="bg-slate-800 sticky top-0">
            <tr>
              <th className="p-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">Date</th>
              <th className="p-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">Description</th>
              <th className="p-3 text-xs font-semibold tracking-wider text-slate-400 uppercase text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions && data.transactions.length > 0 ? (
              data.transactions.map((tx, index) => <TransactionTableRow key={index} transaction={tx} />)
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-slate-400">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatementDisplay;
