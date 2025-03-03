// src/components/SimulationWSClient.jsx
import React, { useEffect } from 'react';

function SimulationWSClient({ mode, wsRef }) {

  useEffect(() => {


    const container = document.querySelector('.espaceView-container');
    if(!container) return;

    const handleMouseMove = (e) => {
      // N’envoie la position du curseur QUE si on est en mode "repulsion"
      if (mode !== "repulsion") return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Inverse offset => simX, simY
      const simX = mouseX + 300;
      const simY = mouseY - 100;

      if(wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type:'pointer', x: simX, y: simY }));
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mode]);

  return null;
}

export default SimulationWSClient;