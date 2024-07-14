import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { walletState } from './store/wallet';
import { walletHistoryState } from './store/walletHistory';

export const WalletPage = observer(function WalletPage() {
  const [newExpenseText, setNewExpenseText] = React.useState('');
  const [btnsHover, setBtnsHover] = React.useState({
    addBtnHover: false,
    removeBtnHover: false,
    endBtnHover: false,
  });
  const [expenseValidation, setExpenseValidation] = React.useState({
    value: false,
    text: '',
  });

  return (
    <View style={styles.app}>
      <Text style={styles.monthTitle}>This month:</Text>
      <View style={styles.expensesList}>
        {walletState.expenses.map((expense) => (
          <View key={expense.id}>
            <Text style={styles.expenseText}>{expense.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.mediumValue}>
        <Text>Medium value: </Text>
        <Text style={{}}>{walletState.mediumExpense}</Text>
      </View>
      <View style={styles.mediumValue}>
        <Text>Approximate medium value left per day: </Text>
        <Text>{walletState.approximatePerDayLeft}</Text>
      </View>
      <View
        style={{
          marginTop: '10px',
          // marginVertical: ""
        }}
      >
        <Text style={{ color: '#303030' }}>Enter your expense:</Text>
      </View>
      <TextInput
        style={[styles.input, expenseValidation.value && styles.inputError]}
        value={newExpenseText}
        onFocus={() => {
          setExpenseValidation({ value: false });
        }}
        onChangeText={(val) => setNewExpenseText(val)}
      />
      <Text style={styles.validationText}>{expenseValidation.text}</Text>
      <Pressable
        onHoverIn={() => {
          setBtnsHover((s) => ({
            ...s,
            addBtnHover: true,
          }));
        }}
        onHoverOut={() => {
          setBtnsHover((s) => ({
            ...s,
            addBtnHover: false,
          }));
        }}
        onPress={() => {
          if (!newExpenseText) {
            setExpenseValidation({ value: true, text: 'Required' });
            return;
          }
          if (isNaN(parseInt(newExpenseText))) {
            setExpenseValidation({ value: true, text: 'Must be number' });
            return;
          }
          walletState.addNewExpense({
            id: crypto.randomUUID(),
            value: newExpenseText * 1,
          });
        }}
        style={[
          styles.addExpenseBtn,
          btnsHover.addBtnHover && {
            backgroundColor: '#aadddd',
          },
        ]}
      >
        <View>
          <Text style={styles.whiteColor}>Add new expense</Text>
        </View>
      </Pressable>
      <Pressable
        onHoverIn={() => {
          setBtnsHover((s) => ({
            ...s,
            removeBtnHover: true,
          }));
        }}
        onHoverOut={() => {
          setBtnsHover((s) => ({
            ...s,
            removeBtnHover: false,
          }));
        }}
        onPress={() => {
          walletState.removeLastExpense();
        }}
        style={[
          styles.removeExpenseBtn,
          btnsHover.removeBtnHover && {
            backgroundColor: '#eeffff',
          },
        ]}
      >
        <View>
          <Text style={styles.lightBlueColor}>Remove last expense</Text>
        </View>
      </Pressable>
      <Pressable
        onHoverIn={() => {
          setBtnsHover((s) => ({
            ...s,
            endBtnHover: true,
          }));
        }}
        onHoverOut={() => {
          setBtnsHover((s) => ({
            ...s,
            endBtnHover: false,
          }));
        }}
        onPress={() => {
          let isSure = window.confirm('Are you sure to end this month?');
          if (isSure) {
            walletHistoryState.saveMonthExpenses(walletState.expenses);
            walletState.reset();
          }
        }}
        style={[
          styles.removeExpenseBtn,
          btnsHover.endBtnHover && {
            backgroundColor: '#eeffff',
          },
        ]}
      >
        <View>
          <Text style={styles.lightBlueColor}>End current month</Text>
        </View>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  app: {
    maxWidth: '500px',
    width: '100%',
    marginHorizontal: 'auto',
    padding: '16px',
  },
  monthTitle: {
    fontSize: '24px',
    fontWeight: 'semi-bold',
    marginBottom: '8px',
  },
  expensesList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
  },
  mediumValue: {
    marginTop: '8px',
    color: 'darkblue',
  },
  expenseText: {
    color: 'darkblue',
  },
  input: {
    marginTop: '8px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid lightgrey',
  },
  inputError: {
    border: '1px solid red',
    // borderColor: 'red',
  },
  validationText: {
    color: 'red',
  },
  addExpenseBtn: {
    marginTop: '8px',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  removeExpenseBtn: {
    marginTop: '8px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBlueColor: {
    color: 'lightblue',
  },
  whiteColor: {
    color: 'white',
  },
});
