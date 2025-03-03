import React, { useState } from 'react';

function SimulationControls({
  onAdvance,
  onPlay,
  onPause,
  onShowOptions,
  onBackHome
}) {
  const [error, setError] = useState('');

  const handleAdvance1 = async () => {
    try {
      await onAdvance(1);
    } catch (err) {
      setError('Erreur lors de l’avancement de la simulation (1 step).');
    }
  };
  const handleAdvance10 = async () => {
    try {
      await onAdvance(10);
    } catch (err) {
      setError('Erreur lors de l’avancement de la simulation (10 steps).');
    }
  };

  return (
    <div className="menu">
      <h4>Contrôles de la simulation</h4>
      <button onClick={handleAdvance1}>Avancer 1 step</button>
      <button onClick={handleAdvance10}>Avancer 10 steps</button>
      <br />
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <br />
      <button onClick={onShowOptions}>Options</button>
      <button onClick={onBackHome}>Retour Accueil</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SimulationControls;
