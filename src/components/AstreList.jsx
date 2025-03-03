// src/components/AstreList.jsx
import React from 'react';
import AstreItem from './AstreItem';

/**
 * Affiche la liste complète des astres.
 *
 * @param {Object[]} astres - tableau d'objets astre (nom, taille, masse, etc.)
 * @param {Function} onRefresh - callback à invoquer après suppression ou modification
 */
function AstreList({ astres, onRefresh }) {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '8px' }}>
      <h4>Liste des Astres</h4>
      {astres.length === 0 && <p>Aucun astre.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {astres.map((a, idx) => (
          <AstreItem key={idx} astre={a} onDeleted={onRefresh} />
        ))}
      </div>
    </div>
  );
}

export default AstreList;
