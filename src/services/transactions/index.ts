import { NewTransaction, Transaction } from '_types/transactions';
import { api } from '../index';

interface GetUserTransactions {
  user_id: number;
  signal: AbortSignal;
}

interface GetUserTransactionsResponse {
  transactions: Transaction[];
}

interface CreateTransaction {
  transaction: NewTransaction;
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

const get_user_transactions = async ({
  user_id,
  signal,
}: GetUserTransactions): Promise<GetUserTransactionsResponse> => {
  try {
    const { data } = await api.get<GetUserTransactionsResponse>(
      '/transactions',
      {
        params: {
          user_id,
        },
        signal,
      },
    );

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

const create_transaction = async ({ transaction }: CreateTransaction) => {
  try {
    const { data } = await api.post<CreateTransactionResponse>(
      '/transactions',
      {
        ...transaction,
      },
    );

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const transactions_service = {
  create_transaction,
  get_user_transactions,
};
