import React from 'react';
import AstreItem from './AstreItem';

function MenuSysteme({ astres, onRefresh }) {
  return (
    <div className="menu">
      <h4>Menu Système</h4>
      <p>Liste des astres :</p>
      <div className="flex-wrap">
        {astres.map((a, idx) => (
          <AstreItem key={idx} astre={a} onDeleted={onRefresh} />
        ))}
      </div>
    </div>
  );
}

export default MenuSysteme;
