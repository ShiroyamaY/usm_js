import TransactionAnalyzer from "./TransactionAnalyzer.js";
import * as fs from 'fs';
const transactions = JSON.parse(fs.readFileSync('src/transactions.json'));
const analyzer = new TransactionAnalyzer(transactions);

const transaction = {
    transaction_id: "99",
    transaction_date: "2023-04-31",
    transaction_amount: 250,
    transaction_type: "credit",
    transaction_description: "mda...",
    merchant_name: "OnlineStore",
    card_type: "VB"
  }
  analyzer.addTransaction(transaction);
//   console.log("getAllTransactions:", analyzer.getAllTransactions());
//   console.log("getFirstTransaction:", analyzer.getFirstTransaction());
//   console.log("getUniqueTransactionsType:", analyzer.getUniqueTransactionsType());
//   console.log("calculateTotalAmount:", analyzer.calculateTotalAmount());
//   console.log("calculateTotalAmountByDate:", analyzer.calculateTotalAmountByDate(2019, 1, 1));
//   console.log("getTransactionByType:", analyzer.getTransactionByType('debit'));
//   console.log("getTransactionsInDateRange:", analyzer.getTransactionsInDateRange('2019-01-01', '2019-02-28'));
//   console.log("getTransactionsByMerchant:", analyzer.getTransactionsByMerchant('OnlineStore'));
//   console.log("calculateAverageTransactionAmount:", analyzer.calculateAverageTransactionAmount());
//   console.log("getTransactionsByAmountRange:", analyzer.getTransactionsByAmountRange(100, 250));
//   console.log("calculateTotalDebitAmount:", analyzer.calculateTotalDebitAmount());
//   console.log("findMostTransactionsMonth:", analyzer.findMostTransactionsMonth());
//   console.log("findMostDebitTransactionMonth:", analyzer.findMostDebitTransactionMonth());
//   console.log("mostTransactionTypes:", analyzer.mostTransactionTypes());
//   console.log("getTransactionsBeforeDate:", analyzer.getTransactionsBeforeDate('2019-02-01'));
//   console.log("findTransactionById:", analyzer.findTransactionById(2));
//   console.log("mapTransactionDescriptions:", analyzer.mapTransactionDescriptions());