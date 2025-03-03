// src/components/EspaceView.jsx
import React, { useState, useRef, useEffect } from 'react';

function EspaceView({ astres, mode, sendWSMessage }) {
  const [draggedAstre, setDraggedAstre] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const width = 1200;
  const height = 800;

  // Convertit les coordonnées de l'écran en coordonnées de simulation (selon vos offsets)
  const screenToSim = (mouseX, mouseY) => {
    // Vos formules actuelles dans EspaceView :
    // left = positionX - 300, top = positionY + 100
    // Donc, pour obtenir positionX et positionY à partir de la position du curseur (dans le container) :
    // positionX = mouseX + 300, positionY = mouseY - 100
    return {
      x: mouseX + 300,
      y: mouseY - 100,
    };
  };

  // Gestion globale du drag : on ajoute les listeners sur le document quand un astre est saisi
  useEffect(() => {
    if (mode !== 'drag' || !draggedAstre) return;

    const handleDocumentMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const { x: simX, y: simY } = screenToSim(mouseX, mouseY);
      
      // Envoi WS du message "drag"
      if (sendWSMessage) {
        sendWSMessage({
          type: 'drag',
          astre: draggedAstre.nom,
          x: simX,
          y: simY,
        });
      }
      
      // Mise à jour locale pour affichage immédiat
      draggedAstre.positionX = simX;
      draggedAstre.positionY = simY;
      setLastPos({ x: simX, y: simY });
    };

    const handleDocumentMouseUp = (e) => {
      if (!draggedAstre) return;
      const dx = lastPos.x - startPos.x;
      const dy = lastPos.y - startPos.y;
      const scaleTemps = 432; 
      const vx = dx * scaleTemps;
      const vy = dy * scaleTemps;
    
      if (sendWSMessage) {
        sendWSMessage({
          type: 'launch',
          astre: draggedAstre.nom,
          vx,
          vy,
        });
      }
      setDraggedAstre(null);
    };

    // Attache globalement sur document
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);

    // Cleanup quand le drag se termine
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [draggedAstre, lastPos, startPos, mode, sendWSMessage]);

  // Handlers attachés aux astres individuels
  const handleMouseDown = (e, astre) => {
    if (mode !== 'drag') return;
    if (astre.nom === 'CURSOR') return; // Ignorer le curseur
    // On envoie "grab"
    if (sendWSMessage) {
      sendWSMessage({ type: 'grab', astre: astre.nom });
    }
    setDraggedAstre(astre);
    setStartPos({ x: astre.positionX, y: astre.positionY });
    setLastPos({ x: astre.positionX, y: astre.positionY });
    // Empêcher la propagation pour éviter d'autres comportements indésirables
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="espaceView-container"
      style={{
        width,
        height,
        position: 'relative',
        border: '1px solid #999',
      }}
    >
      <h4 className="espaceView-title">Espace</h4>
      {astres.map((a, idx) => {
        const posLeft = a.positionX - 300;
        const posTop = a.positionY + 100;
        const diameter = a.taille;
        const radius = diameter / 2;

        // Astre curseur : rendu invisible
        if (a.nom === "CURSOR") {
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: posLeft,
                top: posTop,
                width: diameter,
                height: diameter,
                borderRadius: '50%',
                backgroundColor: 'red',
                opacity: 0,
                pointerEvents: 'none',
                transform: `translate(-${radius}px, -${radius}px)`,
              }}
            />
          );
        }

        // Astres normaux
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: posLeft,
              top: posTop,
              width: diameter,
              height: diameter,
              borderRadius: '50%',
              backgroundColor: a.color || 'red',
              opacity: 0.7,
              transform: `translate(-${radius}px, -${radius}px)`,
              cursor: mode === 'drag' ? 'grab' : 'default',
            }}
            onMouseDown={(e) => handleMouseDown(e, a)}
          />
        );
      })}
    </div>
  );
}

export default EspaceView;