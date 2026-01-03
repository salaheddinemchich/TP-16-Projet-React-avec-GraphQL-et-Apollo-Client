import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

const TransactionList = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Chargement des transactions...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data || !data.allTransactions || data.allTransactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Historique Transactions</h2>
        <p>Aucune transaction disponible.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Historique Transactions</h2>
      <div className="overflow-auto max-h-96">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Type</th>
              <th scope="col" className="px-6 py-4">Montant</th>
              <th scope="col" className="px-6 py-4">Compte ID</th>
              <th scope="col" className="px-6 py-4">Date</th>
              <th scope="col" className="px-6 py-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.allTransactions.map((t) => (
              <tr key={t.id} className="border-b dark:border-neutral-500">
                <td className={`whitespace-nowrap px-6 py-4 font-bold ${t.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{t.montant}</td>
                <td className="whitespace-nowrap px-6 py-4">{t.compteId ?? 'Inconnu'}</td>
                <td className="whitespace-nowrap px-6 py-4">{t.date ? new Date(t.date).toLocaleString() : 'N/A'}</td>
                <td className="whitespace-nowrap px-6 py-4">{t.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;