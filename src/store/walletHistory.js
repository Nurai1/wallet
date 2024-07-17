import { observable, makeObservable, action, autorun } from 'mobx';
import { customDayjs } from "../utils/customDayjs"

export class WalletHistory {
  expensesByMonth = {};

  constructor() {
    this.expensesByMonth = localStorage.getItem('expensesByMonth')
      ? JSON.parse(localStorage.getItem('expensesByMonth'))
      : {};

    makeObservable(this, {
      expensesByMonth: observable,
      saveMonthExpenses: action,
    });
  }

  saveMonthExpenses(expenses) {
    const lastMonthDate = customDayjs().set('month', customDayjs().month() - 1);
    // const daysInMonthLastMonth = lastMonthDate.daysInMonth();

    this.expensesByMonth[
      `${lastMonthDate.format('DD/MM/YYYY')} - ${customDayjs().format('DD/MM/YYYY')}`
    ] = expenses;
  }
}

export const walletHistoryState = new WalletHistory();

autorun(() => {
  console.log(
    'Set Expenses History to local storage:',
    walletHistoryState.expensesByMonth
  );
  localStorage.setItem(
    'expensesByMonth',
    JSON.stringify(walletHistoryState.expensesByMonth)
  );
});
