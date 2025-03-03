import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OptionView({ onClose, onReloadSimulation }) {
  const navigate = useNavigate();
  const [showTrajectoires, setShowTrajectoires] = useState(true);
  const [collisions, setCollisions] = useState(true);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      setMessage('Simulation enregistrée avec succès (simulation).');
    } catch (err) {
      setMessage('Erreur lors de la sauvegarde.');
    }
  };

  const handleQuit = () => {
    navigate('/');
  };

  const handleReset = async () => {
    try {
      if (onReloadSimulation) {
        onReloadSimulation();
      }
      setMessage('Simulation réinitialisée.');
    } catch (err) {
      setMessage('Erreur lors de la réinitialisation.');
    }
  };

  const handleOpenSettings = () => {
    setMessage('(Paramètres supplémentaires...)');
  };

  const handleToggleTrajectoires = () => {
    setShowTrajectoires(!showTrajectoires);
  };
  const handleToggleCollisions = () => {
    setCollisions(!collisions);
  };

  const handleReturn = () => {
    if (onClose) onClose();
  };

  return (
    <div className="option-overlay">
      <div className="option-content">
        <h3>Options</h3>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={handleSave}>Enregistrer</button>
          <button onClick={handleQuit}>Quitter</button>
          <button onClick={handleOpenSettings}>Paramètres</button>
          <button onClick={handleReset}>Réinitialiser</button>
          <button onClick={handleReturn}>Retour</button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={showTrajectoires}
              onChange={handleToggleTrajectoires}
            />
            Afficher/Masquer les trajectoires
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={collisions}
              onChange={handleToggleCollisions}
            />
            Activer/Désactiver les collisions
          </label>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default OptionView;
