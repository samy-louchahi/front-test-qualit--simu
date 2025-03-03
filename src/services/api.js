// src/services/api.js
import axios from 'axios';

// Adapte la baseURL si nécessaire (ex: http://localhost:8080, etc.)
const API = axios.create({
  baseURL: 'https://back-testci.onrender.com:8080'
});

/* ------------------ ASTRE RESOURCE (/astres) ------------------ */

/**
 * Récupère la liste de tous les astres (GET /astres).
 */
export const fetchAllAstres = () => {
  return API.get('/astres');  // --> appelle AstreResource.getAllAstres()
};

/**
 * Récupère un astre en particulier par son nom (GET /astres/{nom}).
 */
export const fetchAstre = (nom) => {
  return API.get(`/astres/${nom}`);
};

/**
 * Crée un nouvel astre
 * (POST /astres) : { nom, taille, masse, positionX, positionY, vitesseX, vitesseY }
 */
export const createAstre = (planeteData) => {
  return API.post('/astres', planeteData);
};

/**
 * Supprime un astre par son nom (DELETE /astres/{nom}).
 */
export const deleteAstre = (nom) => {
  return API.delete(`/astres/${nom}`);
};

/* ------------------ SIMULATION RESOURCE (/simulation) ------------------ */

/**
 * (Optionnel) Récupère la liste d’astres via /simulation (GET /simulation).
 * Semblable à fetchAllAstres(), mais via SimulationResource.
 * À utiliser seulement si tu préfères lister via /simulation au lieu de /astres.
 */
/*
export const fetchAllAstresSimu = () => {
  return API.get('/simulation');
};
*/

/**
 * Fait avancer la simulation d'un certain nombre de pas
 * (POST /simulation/advance?steps=N). Par défaut : 1 step.
 */
export const advanceSimulation = (steps = 1) => {
  return API.post(`/simulation/advance?steps=${steps}`);
};

/**
 * Modifie le facteur de vitesse global de la simulation (PUT /simulation/rate/{value}).
 */
export const setSimulationRate = (value) => {
  return API.put(`/simulation/rate/${value}`);
};

/**
 * Retourne un résumé textuel de la simulation (GET /simulation/info).
 */
export const getSimulationInfo = () => {
  return API.get('/simulation/info', { responseType: 'text' });
};

export const uploadSimuFileOctetStream = (file) => {
    return API.post('/simulation/upload', file, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
  }

  export const resetSimulation = () => {
    return API.post('/simulation/reset');
  };
