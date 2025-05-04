import React from 'react';

function DeckNameInput({ deckName, setDeckName }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-2">Nome do Deck</h2>
      <input
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Digite o nome do deck"
      />
    </div>
  );
}

export default DeckNameInput;
