export interface Transaction {
  date: string;
  description: string;
  amount: number;
}

export interface StatementData {
  cardType: string;
  cardHolderName: string;
  cardLastFourDigits: string;
  billingCycle: string;
  paymentDueDate: string;
  totalDues: number;
  transactions: Transaction[];
}
