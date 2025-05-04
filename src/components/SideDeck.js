import React, { useState } from 'react';

function SideDeck({ sideDeck = [], mainDeck = [], setMainDeck, extraDeck = [], setExtraDeck, setSelectedCard, handleAddToSideDeck, draggedCard, setDraggedCard }) {
  const totalSlots = 15;
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const data = e.dataTransfer.getData('application/json');
    if (data) {
      try {
        const parsed = JSON.parse(data);

        let card;
        if (parsed.card) {
          card = parsed.card;

          if (parsed.from === 'main') {
            // Se veio do Main Deck
            const updatedMainDeck = [...mainDeck];
            const cardIndex = updatedMainDeck.findIndex(c => c.id === card.id);
            if (cardIndex !== -1) {
              updatedMainDeck.splice(cardIndex, 1);
              setMainDeck(updatedMainDeck);
            }
          }

          if (parsed.from === 'extra') {
            // Se veio do Extra Deck
            const updatedExtraDeck = [...extraDeck];
            const cardIndex = updatedExtraDeck.findIndex(c => c.id === card.id);
            if (cardIndex !== -1) {
              updatedExtraDeck.splice(cardIndex, 1);
              setExtraDeck(updatedExtraDeck);
            }
          }

        } else {
          // Drag vindo da Galeria
          card = parsed;
        }

        handleAddToSideDeck(card);
      } catch (error) {
        console.error('Erro ao fazer parse no drop dentro do Side Deck:', error);
      }
    } else if (draggedCard) {
      handleAddToSideDeck(draggedCard);
      setDraggedCard(null);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Side Deck (até 15 cartas)</h2>
      <div
        className={`p-1 rounded overflow-x-auto ${isDragOver ? 'bg-blue-300' : 'bg-gray-100'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="grid grid-cols-15 gap-0 w-full h-full">
          {Array.from({ length: totalSlots }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center aspect-[7/10]"
            >
              {sideDeck[index] && (
                <img
                  src={sideDeck[index].card_images[0].image_url_small}
                  alt={sideDeck[index].name}
                  className="cursor-pointer w-full h-full object-contain"
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', sideDeck[index].name);
                    e.dataTransfer.setData('application/json', JSON.stringify({ card: sideDeck[index], from: 'side' }));
                  }}
                  onClick={() => setSelectedCard(sideDeck[index])}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideDeck;
