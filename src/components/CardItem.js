import React from 'react';

function CardItem({ card }) {
  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px', borderRadius: '10px' }}>
      <h2>{card.name}</h2>
      {card.card_images && (
        <img
          src={card.card_images[0].image_url_small}
          alt={card.name}
          style={{ width: '100px', height: '140px' }}
        />
      )}
      <p>{card.type}</p>
      <p>{card.desc}</p>
    </div>
  );
}

export default CardItem;