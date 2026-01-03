import { gql } from '@apollo/client';

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    saveTransaction(transaction: $transaction) {
      id
      montant
      date
      type
      compteId
      description
    }
  }
`;

// optional alias for compatibility
export const SAVE_TRANSACTION = ADD_TRANSACTION;

// example existing saveCompte mutation
export const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      type
      dateCreation
    }
  }
`;