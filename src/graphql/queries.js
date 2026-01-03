import { gql } from '@apollo/client';

export const GET_ALL_COMPTES = gql`
query GetAllComptes {
  allComptes {
    id
    solde
    type
    dateCreation
  }
}
`;

export const GET_COMPTE_BY_ID = gql`
query GetCompteById($id: ID!) {
  compteById(id: $id) {
    id
    solde
    dateCreation
    type
  }
}
`;

export const GET_ALL_TRANSACTIONS = gql`
query GetAllTransactions {
  allTransactions {
    id
    montant
    date
    type
    compteId
    description
  }
}
`;

export const GET_TRANSACTIONS_BY_COMPTE = gql`
query GetTransactionsByCompte($compteId: ID!) {
  transactionsByCompte(compteId: $compteId) {
    id
    montant
    date
    type
    compteId
    description
  }
}
`;