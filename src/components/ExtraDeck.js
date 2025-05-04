import React from 'react';

function ExtraDeck({ extraDeck = [], setSelectedCard, handleAddToExtraDeck, draggedCard, setDraggedCard, sideDeck, setSideDeck }) {
  const totalSlots = 15;

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
  
    if (data) {
      try {
        const parsed = JSON.parse(data);
  
        if (parsed.from === 'side') {
          const updatedSideDeck = [...sideDeck];
          const cardIndex = updatedSideDeck.findIndex(c => c.id === parsed.card.id);
          if (cardIndex !== -1) {
            updatedSideDeck.splice(cardIndex, 1);
            setSideDeck(updatedSideDeck);
          }
        }
  
        handleAddToExtraDeck(parsed.card);
  
      } catch (error) {
        console.error('Erro ao fazer parse no drop dentro do Extra Deck:', error);
      }
    } else if (draggedCard) {
      handleAddToExtraDeck(draggedCard);
      setDraggedCard(null);
    }
  };
  

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Extra Deck (até 15 cartas)</h2>
      <div
        className="p-1 bg-gray-100 rounded overflow-x-auto"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="grid grid-cols-15 gap-0 w-full h-full">
          {Array.from({ length: totalSlots }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center aspect-[7/10]"
            >
              {extraDeck[index] && (
                <img
                  src={extraDeck[index].card_images[0].image_url_small}
                  alt={extraDeck[index].name}
                  className="cursor-pointer w-full h-full object-contain"
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', extraDeck[index].name);
                    e.dataTransfer.setData('application/json', JSON.stringify({ card: extraDeck[index], from: 'extra' }));
                  }}
                  onClick={() => setSelectedCard(extraDeck[index])}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExtraDeck;
