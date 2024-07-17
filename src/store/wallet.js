import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { customDayjs } from "../utils/customDayjs"

const DAYS_PER_MONTH = 30;
const DOLLARS_PER_DAY_LIMIT = 50;

export class Wallet {
  expenses = [];
  lastDateExpenseAdded = null;

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

    this.lastDateExpenseAdded = localStorage.getItem("lastDateExpenseAdded")

    makeObservable(this, {
      expenses: observable,
      lastDateExpenseAdded: observable,
      addNewExpense: action,
      removeLastExpense: action,
      reset: action,
      updateLastDateExpenseAdded: action,
      sumExpenses: computed,
      mediumExpense: computed,
      daysPassed: computed,
      approximatePerDayLeft: computed,
    });
  }

  addNewExpense(expense) {
    this.expenses.push(expense);
    this.updateLastDateExpenseAdded()
  }

  removeLastExpense() {
    this.expenses.pop();
  }

  reset() {
    this.expenses = [];
  }

  updateLastDateExpenseAdded() {
    this.lastDateExpenseAdded = customDayjs().format()
    localStorage.setItem("lastDateExpenseAdded", this.lastDateExpenseAdded)
  }
}

export const walletState = new Wallet();

autorun(() => {
  console.log('Set Expenses to local storage:', walletState.expenses);
  localStorage.setItem('expenses', JSON.stringify(walletState.expenses));
});
