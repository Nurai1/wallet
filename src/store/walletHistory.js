// import { observable, makeObservable, action, computed, autorun } from 'mobx';

// export class WalletHistory {
//   expenses = [];

//   get mediumExpense() {
//     return (
//       this.expenses.reduce((acc, expense) => acc + expense.value, 0) /
//       this.expenses.length
//     );
//   }

//   constructor() {
//     this.expenses = localStorage.getItem('expenses')
//       ? JSON.parse(localStorage.getItem('expenses'))
//       : [];

//     makeObservable(this, {
//       expenses: observable,
//       addNewExpense: action,
//       mediumExpense: computed,
//     });
//   }

//   addNewExpense(expense) {
//     this.expenses.push(expense);
//   }
// }

// export const walletState = new Wallet();

// autorun(() => {
//   console.log('Set Expenses to local storage:', walletState.expenses);
//   localStorage.setItem('expenses', JSON.stringify(walletState.expenses));
// });
