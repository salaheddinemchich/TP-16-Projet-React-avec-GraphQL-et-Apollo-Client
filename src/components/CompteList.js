import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);
  
  if (loading) return <p className="text-center text-gray-500">Chargement des comptes...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error.message}</p>;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Comptes</h2>
      <div className="grid gap-4">
        {data.allComptes.map((compte) => (
          <div key={compte.id} className="border-b pb-4 last:border-0">
            <p className="font-semibold">ID: <span className="font-normal">{compte.id}</span></p>
            <p className="font-semibold">Solde: <span className="font-normal text-green-600">{compte.solde} €</span></p>
            <p className="font-semibold">Type: <span className="badge bg-gray-200 px-2 py-1 rounded text-sm">{compte.type}</span></p>
            <p className="text-sm text-gray-500">Créé le : {compte.dateCreation ? new Date(compte.dateCreation).toLocaleDateString() : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompteList;