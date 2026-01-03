import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { ADD_TRANSACTION } from '../graphql/mutations';

const TransactionForm = () => {
  const [compteId, setCompteId] = useState('');
  const [montant, setMontant] = useState('');
  const [type, setType] = useState('CREDIT');
  const [description, setDescription] = useState('');

  // On récupère les comptes pour pouvoir les sélectionner
  const { data: dataComptes } = useQuery(GET_ALL_COMPTES);

  const [addTransaction, { loading: saving }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{ query: GET_ALL_TRANSACTIONS }, { query: GET_ALL_COMPTES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!compteId) {
      alert("Veuillez sélectionner un compte");
      return;
    }
    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId,
            montant: parseFloat(montant),
            date: new Date().toISOString(),
            type,
            description,
          },
        },
      });
      setMontant('');
      setCompteId('');
      setType('CREDIT');
      setDescription('');
      alert('Transaction ajoutée !');
    } catch (err) {
      console.error('Erreur transaction:', err);
      alert('Erreur lors de l’ajout de la transaction.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Ajouter une Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Compte Cible</label>
          <select
            className="mt-1 block w-full border p-2 rounded"
            value={compteId}
            onChange={(e) => setCompteId(e.target.value)}
            required
          >
            <option value="">Choisir un compte...</option>
            {dataComptes && dataComptes.allComptes.map(c => (
              <option key={c.id} value={c.id}>{c.id} - Solde: {c.solde}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type Transaction</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          >
            <option value="CREDIT">Dépôt (CREDIT)</option>
            <option value="DEBIT">Retrait (DEBIT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description (optionnel)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {saving ? 'Enregistrement...' : 'Valider Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;