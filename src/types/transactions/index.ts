import { Category } from '_types/categories';
import { User } from '_types/users';

export interface Transaction {
  category: Category;
  created_at: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_id: number;
  transaction_name: string;
  updated_at: string;
  user: User;
}

export interface NewTransaction {
  category_name: string;
  transaction_name: string;
  transaction_date: string;
  transaction_amount: number;
}
