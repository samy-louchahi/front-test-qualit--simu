import React, { useState } from 'react';
import { createAstre } from '../services/api';

function MenuAjouter({ onAstreAdded }) {
  const [nom, setNom] = useState('');
  const [taille, setTaille] = useState('');
  const [masse, setMasse] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [vitesseX, setVitesseX] = useState('');
  const [vitesseY, setVitesseY] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAstre({
        nom,
        taille: parseFloat(taille),
        masse: parseFloat(masse),
        positionX: parseFloat(positionX),
        positionY: parseFloat(positionY),
        vitesseX: parseFloat(vitesseX),
        vitesseY: parseFloat(vitesseY)
      });
      if (onAstreAdded) onAstreAdded();
      setNom('');
      setTaille('');
      setMasse('');
      setPositionX('');
      setPositionY('');
      setVitesseX('');
      setVitesseY('');
    } catch (err) {
      setError('Erreur création astre.');
      console.error(err);
    }
  };

  return (
    <div className="menu">
      <h4>Ajouter un Astre</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <label>Nom : </label>
          <input value={nom} onChange={e => setNom(e.target.value)} />
        </div>
        <div>
          <label>Taille : </label>
          <input value={taille} onChange={e => setTaille(e.target.value)} />
        </div>
        <div>
          <label>Masse : </label>
          <input value={masse} onChange={e => setMasse(e.target.value)} />
        </div>
        <div>
          <label>PositionX : </label>
          <input value={positionX} onChange={e => setPositionX(e.target.value)} />
        </div>
        <div>
          <label>PositionY : </label>
          <input value={positionY} onChange={e => setPositionY(e.target.value)} />
        </div>
        <div>
          <label>VitesseX : </label>
          <input value={vitesseX} onChange={e => setVitesseX(e.target.value)} />
        </div>
        <div>
          <label>VitesseY : </label>
          <input value={vitesseY} onChange={e => setVitesseY(e.target.value)} />
        </div>
        <button type="submit">Créer</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default MenuAjouter;
