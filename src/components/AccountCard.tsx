import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BankAccount } from '../services/api';

const { width } = Dimensions.get('window');

interface AccountCardProps {
  account: BankAccount;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(balance);
  };

  const formatAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.bankName}>{account.bankName}</Text>
        <Text style={styles.accountType}>{account.accountType}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.balance}>{formatBalance(account.balance)}</Text>
        <Text style={styles.accountNumber}>
          {formatAccountNumber(account.accountNumber)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 160, // Reduced from previous height
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountType: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  cardBody: {
    marginTop: 20,
  },
  balance: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountNumber: {
    color: '#bdc3c7',
    fontSize: 16,
    letterSpacing: 2,
  },
});

export default AccountCard;
