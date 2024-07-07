import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { walletState } from './store/wallet';

export const WalletPage = observer(function WalletPage() {
  const [newExpenseText, setNewExpenseText] = React.useState('');
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
        <Text>{walletState.mediumExpense}</Text>
      </View>
      <View style={styles.mediumValue}>
        <Text>Approximate medium value left per day: </Text>
        <Text>{walletState.approximatePerDayLeft}</Text>
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
        style={styles.addExpenseBtn}
      >
        <View>
          <Text>Add new expense</Text>
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
  },
});
