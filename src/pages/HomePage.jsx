// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'; // si tu veux importer le CSS ici (ou globalement dans index.js)

function HomePage() {
  const navigate = useNavigate();

  const handleNouvelle = () => {
    navigate('/simulation');
  };

  const handleCharger = () => {
    navigate('/choose');
  };

  const handleCredit = () => {
    navigate('/credit');
  };

  return (
    <div className="container flex-column" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '1rem' }}>Trajectoire de planètes</h1>
      <div className="box" style={{ textAlign: 'center' }}>
        <button onClick={handleNouvelle} style={{ display: 'block', margin: '0.5rem auto' }}>
          Nouveau Système
        </button>
        <button onClick={handleCharger} style={{ display: 'block', margin: '0.5rem auto' }}>
          Charger un Système
        </button>
      </div>
    </div>
  );
}

export default HomePage;
