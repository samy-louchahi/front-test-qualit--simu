// src/pages/ChooseFilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadSimuFileOctetStream } from '../services/api';

function ChooseFilePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Simule un chargement du système solaire
  const handleLoadSystemeSolaire = async () => {
    try {
      // TODO: Appeler un endpoint /simulation/loadSystemeSolaire par ex.
      // ou initialiser d’une autre façon
      setMessage('Système solaire chargé (simulation).');
      // Rediriger vers /simulation
      navigate('/simulation');
    } catch (err) {
      setMessage('Erreur lors du chargement du système solaire.');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Aucun fichier sélectionné.');
      return;
    }
    try {
      await uploadSimuFileOctetStream(file);
      setMessage(`Fichier ${file.name} chargé.`);
      navigate('/simulation');
    } catch (err) {
      setMessage('Erreur lors du chargement depuis le fichier.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Charger un Système</h2>
      <div style={{ margin: '1rem 0' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Charger à partir d'un fichier</button>
      </div>
      <button onClick={handleBack}>Retour Accueil</button>

      {message && <p style={{ marginTop: '1rem', color: 'blue' }}>{message}</p>}
    </div>
  );
}

export default ChooseFilePage;
