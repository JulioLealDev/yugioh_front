import React from 'react';

function CardPreview({ selectedCard }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Carta Selecionada</h2>
      {selectedCard ? (
        <div className="flex flex-col items-center">
          <img
            src={selectedCard.card_images[0].image_url}
            alt={selectedCard.name}
            className="w-48 h-auto mb-4"
            style={{ width: '150px', height: '210px' }}
          />
          <h3 className="text-md font-semibold">{selectedCard.name}</h3>
          <p className="text-sm">{selectedCard.type}</p>
          <p className="text-xs mt-2">{selectedCard.desc}</p>
        </div>
      ) : (
        <p>Nenhuma carta selecionada.</p>
      )}
    </div>
  );
}

export default CardPreview;
