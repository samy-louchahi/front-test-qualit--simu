// src/pages/SimulationPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllAstres, advanceSimulation, createAstre, resetSimulation } from '../services/api';
import EspaceView from '../components/EspaceView';
import MenuSysteme from '../components/MenuSysteme';
import MenuAjouter from '../components/MenuAjouter';
import OptionView from '../components/OptionView';
import AstreList from '../components/AstreList';
import SimulationWSClient from '../components/SimulationWSClient';
// On va utiliser SimulationControls pour le bouton bascule ?

function SimulationPage() {
  const navigate = useNavigate();
  const [astres, setAstres] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState("repulsion");
  const intervalRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://back-testci.onrender.com:8080/ws/simulation');
    wsRef.current.onopen = () => console.log("WS Open");
    wsRef.current.onmessage = (e) => console.log("Message:", e.data);
    wsRef.current.onerror = (err) => console.error("WS Error:", err);
    wsRef.current.onclose = () => console.log("WS Close");
  }, []);

  const loadAstres = async () => {
    try {
      const response = await fetchAllAstres();
      setAstres(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des astres.');
      console.error(err);
    }
  };

  const sendWSMessage = (obj) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(obj));
    }
  };
  useEffect(() => {
    loadAstres();
  }, []);

  const tick = async () => {
    try {
      await advanceSimulation(1);
      await loadAstres();
    } catch (err) {
      setError('Erreur lors de la simulation.');
      console.error(err);
    }
  };

  const handlePlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(tick, 16);
    }
  };

  const handlePause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleAdvance = async (steps) => {
    try {
      await advanceSimulation(steps);
      await loadAstres();
    } catch (err) {
      setError('Erreur lors de l’avancement de la simulation.');
      console.error(err);
    }
  };

  const handleBackHome = () => {
    handlePause();
    navigate('/');
  };

  const handleCreateRandomAstres = async () => {
    try {
      // Exemple : on génère des astres avec des positions aléatoires dans des intervalles fixés
      const minX = 300;
      const maxX = 1500;
      const minY = -100;
      const maxY = 700;
      for (let i = 0; i < 5; i++) {
        const randomAstre = {
          nom: "Astro_" + Math.floor(Math.random() * 10000),
          taille: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          masse: parseFloat((Math.random() * 1000 + 100).toFixed(2)),
          positionX: parseFloat((Math.random() * (maxX - minX) + minX).toFixed(2)),
          positionY: parseFloat((Math.random() * (maxY - minY) + minY).toFixed(2)),
          vitesseX: parseFloat(((Math.random() - 0.5) * 1e4).toFixed(2)),
          vitesseY: parseFloat(((Math.random() - 0.5) * 1e4).toFixed(2)),
        };
        await createAstre(randomAstre);
      }
      await loadAstres();
    } catch (err) {
      setError("Erreur lors de la création d'astres aléatoires.");
      console.error(err);
    }
  };

  const handleResetSimulation = async () => {
    try {
      await resetSimulation();
      await loadAstres();
    } catch (err) {
      setError('Erreur lors de la réinitialisation de la simulation.');
      console.error(err);
    }
  };

  // Bouton de bascule de mode
  const toggleMode = () => {
    setMode(prev => prev === "repulsion" ? "drag" : "repulsion");
  };

  return (
    <div className="container flex-column" style={{ padding: '1rem', gap: '1rem' }}>
      <div style={{ marginBottom:'1rem' }}>
        <button onClick={toggleMode}>
          {mode === "repulsion" ? "Passer en mode Drag" : "Passer en mode Répulsion"}
        </button>
        <SimulationWSClient 
         mode={mode} 
         wsRef={wsRef} 
      />
      </div>

      <div className="box" style={{ textAlign: 'center' }}>
        <p>Statut: {intervalRef.current ? 'En cours' : 'En pause'}</p>
        <p>Mode: {mode}</p>
      </div>

      {/* Espace de simulation => on lui passe "mode" */}
      <EspaceView astres={astres} mode={mode} sendWSMessage={sendWSMessage} />

      {/* On peut afficher la liste d'astres, etc. */}
      <AstreList astres={astres} onRefresh={loadAstres} />
      {/* <MenuSysteme astres={astres} onRefresh={loadAstres} />*/}
      <MenuAjouter onAstreAdded={loadAstres} />

      <div style={{ margin:'1rem 0' }}>
        <button onClick={() => handleAdvance(1)}>Avancer (1 step)</button>
        <button onClick={() => handleAdvance(10)}>Avancer (10 steps)</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleResetSimulation}>Réinitialiser</button>
        <button onClick={handleBackHome}>Retour Accueil</button>
        <button onClick={handleCreateRandomAstres}>Créer 5 Astres Aléatoires</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showOptions && (
        <OptionView
          onClose={() => setShowOptions(false)}
          onReloadSimulation={loadAstres}
        />
      )}
    </div>
  );
}

export default SimulationPage;