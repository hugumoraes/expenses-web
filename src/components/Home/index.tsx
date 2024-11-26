import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './styles.module.scss';
import { transactions_service } from '_services/transactions';
import { useAuth } from '_context/auth';
import { NewTransaction, Transaction } from '_types/transactions';
import { Navbar } from '_components/Navbar';

export const Home: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [transaction, setTransaction] = useState<NewTransaction>({
    transaction_name: '',
    transaction_date: '',
    transaction_amount: 0,
    category_name: '',
  });

  console.log(transaction);

  const { userId } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    const fetch_data = async () => {
      try {
        const { transactions } =
          await transactions_service.get_user_transactions({
            user_id: userId,
            signal: controller.signal,
          });

        setTransactions(transactions);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Other error:', error);
        }
      }
    };

    fetch_data();

    return () => {
      controller.abort();
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(name, value);

    setTransaction({ ...transaction, [name]: value });
  };

  const handleCreateTransaction = async () => {
    try {
      const { transaction: newTransaction } =
        await transactions_service.create_transaction({
          transaction,
        });

      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.create_transaction_container}>
          <h1>Create Transaction</h1>

          <input
            name="transaction_name"
            type="text"
            placeholder="Transaction Name"
            onChange={handleInputChange}
          />
          <input
            name="transaction_amount"
            type="number"
            placeholder="Transaction Amount"
            onChange={handleInputChange}
          />
          <input
            name="transaction_date"
            type="date"
            placeholder="Transaction Date"
            onChange={handleInputChange}
          />
          <input
            name="category_name"
            type="text"
            placeholder="Category"
            onChange={handleInputChange}
          />

          <button type="button" onClick={handleCreateTransaction}>
            Create Transaction
          </button>
        </div>

        <h1>Transactions</h1>

        <div className={styles.transactions_container}>
          {transactions &&
            transactions.map(transaction => (
              <div
                className={styles.transaction_container}
                key={transaction.transaction_id}
              >
                <div>{transaction.transaction_name}</div>
                <div>R$ {transaction.transaction_amount}</div>
                <div>{transaction.transaction_date}</div>

                <div>{transaction.category.category_name}</div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};
