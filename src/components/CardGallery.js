import React from 'react';

function CardGallery({ searchResults, setSelectedCard, handleDragStart }) {
  return (
    <div className="grid grid-cols-9 gap-1">
      {searchResults.map((card, index) => (
        <img
          key={`${card.id}-${index}`}
          src={card.card_images[0].image_url_small}
          alt={card.name}
          className="cursor-pointer"
          draggable
          onDragStart={(e) => handleDragStart(e, card)}
          onClick={() => setSelectedCard(card)}
        />
      ))}
    </div>
  );
}

export default CardGallery;
