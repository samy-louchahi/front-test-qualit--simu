// src/components/AstreItem.jsx
import React, { useState } from 'react';
import { deleteAstre } from '../services/api';

function AstreItem({ astre, onDeleted, onDragStart, onDrag, onDragEnd }) {
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await deleteAstre(astre.nom);
      if (onDeleted) onDeleted();
    } catch (err) {
      setError('Erreur suppression astre.');
    }
  };

  // Ces événements de souris gèrent le drag
  const handleMouseDown = (e) => {
    if (onDragStart) onDragStart(astre, e);
  };

  const handleMouseMove = (e) => {
    if (onDrag) onDrag(astre, e);
  };

  const handleMouseUp = (e) => {
    if (onDragEnd) onDragEnd(astre, e);
  };

  return (
    <div
      style={{
        backgroundColor: '#2f3136',
        border: '1px solid #484b51',
        borderRadius: '4px',
        padding: '8px',
        margin: '4px',
        minWidth: '120px',
        cursor: 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      title={`${astre.nom} (Masse: ${astre.masse}, Vx: ${astre.vitesseX}, Vy: ${astre.vitesseY})`}
    >
      <strong>{astre.nom}</strong>
      <p>Taille: {astre.taille.toFixed(2)} - Masse: {astre.masse.toFixed(2)}</p>
      <p>Pos: ({astre.positionX.toFixed(2)}, {astre.positionY.toFixed(2)})</p>
      <p>Vit: ({astre.vitesseX.toFixed(2)}, {astre.vitesseY.toFixed(2)})</p>
      <button onClick={handleDelete}>Supprimer</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AstreItem;
