import React from 'react';

function SideDeck({ sideDeck = [], setSelectedCard, handleAddToSideDeck, draggedCard, setDraggedCard }) {
  const totalSlots = 15;

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedCard) {
      handleAddToSideDeck(draggedCard);
      setDraggedCard(null);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Side Deck (até 15 cartas)</h2>
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
              {sideDeck[index] && (
                <img
                  src={sideDeck[index].card_images[0].image_url_small}
                  alt={sideDeck[index].name}
                  className="cursor-pointer w-full h-full object-contain"
                  draggable={true}
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
