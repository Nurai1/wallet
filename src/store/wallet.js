import { observable, makeObservable, action, computed, autorun } from 'mobx';

const DAYS_PER_MONTH = 30;
const DOLLARS_PER_DAY_LIMIT = 50;

export class Wallet {
  expenses = [];

  get sumExpenses() {
    return this.expenses.reduce((acc, expense) => acc + expense.value, 0);
  }

  get mediumExpense() {
    const medium = this.sumExpenses / this.expenses.length;
    return isNaN(medium) ? 0 : medium.toFixed(2);
  }

  get daysPassed() {
    return this.expenses.length;
  }

  get approximatePerDayLeft() {
    return (
      (DOLLARS_PER_DAY_LIMIT * DAYS_PER_MONTH - this.sumExpenses) /
      (DAYS_PER_MONTH - this.daysPassed)
    ).toFixed(2);
  }

  constructor() {
    this.expenses = localStorage.getItem('expenses')
      ? JSON.parse(localStorage.getItem('expenses'))
      : [];

    makeObservable(this, {
      expenses: observable,
      addNewExpense: action,
      removeLastExpense: action,
      reset: action,
      sumExpenses: computed,
      mediumExpense: computed,
      daysPassed: computed,
      approximatePerDayLeft: computed,
    });
  }

  addNewExpense(expense) {
    this.expenses.push(expense);
  }

  removeLastExpense() {
    this.expenses.pop();
  }

  reset() {
    this.expenses = [];
  }
}

export const walletState = new Wallet();

autorun(() => {
  console.log('Set Expenses to local storage:', walletState.expenses);
  localStorage.setItem('expenses', JSON.stringify(walletState.expenses));
});
