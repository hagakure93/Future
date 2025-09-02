export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  goalId: string;
  amount: number;
  type: 'add' | 'subtract';
  date: Date;
  description?: string;
}