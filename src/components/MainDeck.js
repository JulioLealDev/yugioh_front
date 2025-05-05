import React, { useRef } from 'react';
import { FaSortAlphaDown } from 'react-icons/fa';

function MainDeck({ mainDeck, sideDeck, extraDeck, setSelectedCard, handleAddToMainDeck, setMainDeck, setSideDeck, setExtraDeck, handleDragStart }) {
  const timerRef = useRef(null);

  const sortDeckAlphabetically = () => {
    const sortedMain = [...mainDeck].sort((a, b) => a.name.localeCompare(b.name));
    const sortedSide = [...sideDeck].sort((a, b) => a.name.localeCompare(b.name));
    const sortedExtra = [...extraDeck].sort((a, b) => a.name.localeCompare(b.name));

    setMainDeck(sortedMain);
    setSideDeck(sortedSide);
    setExtraDeck(sortedExtra);
  };

  const totalSlots = Math.max(40, Math.ceil(mainDeck.length / 10) * 10);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // 🔥 Impede evento de vazar para DeckEditor.js
  
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      try {
        const parsed = JSON.parse(data);
  
        if (parsed.card && parsed.from) {
          if (parsed.from === 'side') {
            const updatedSideDeck = [...sideDeck];
            const cardIndex = updatedSideDeck.findIndex(c => c.id === parsed.card.id);
            if (cardIndex !== -1) {
              updatedSideDeck.splice(cardIndex, 1);
              setSideDeck(updatedSideDeck);
            }
            handleAddToMainDeck(parsed.card, true); // mover
          } else if (parsed.from === 'extra') {
            alert('Não é permitido mover cartas do Extra Deck para o Main Deck.');
            return;
          } else if (parsed.from === 'main') {
            // Main -> Main
            handleAddToMainDeck(parsed.card, false); // respeitar limite
          }
        } else {
          // Se não veio com `.card`, é carta pura da galeria
          handleAddToMainDeck(parsed, false); // galeria (respeitar limite)
        }
  
      } catch (error) {
        console.error('Erro ao fazer parse no drop dentro do Main Deck:', error);
      }
    }
  };
  

  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Main Deck (40-60 cartas)</h2>
        <button
          onClick={sortDeckAlphabetically}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
        >
          <FaSortAlphaDown size={20} />
        </button>
      </div>
      <div className="p-1 bg-gray-100 rounded">
        <div className="grid grid-cols-10 gap-0 w-full h-full">
          {Array.from({ length: totalSlots }).map((_, index) => (
            <div key={index} className="flex items-center justify-center aspect-[7/10]">
              {mainDeck[index] && (
                <img
                  src={mainDeck[index].card_images[0].image_url_small}
                  alt={mainDeck[index].name}
                  className="cursor-pointer w-full h-full object-contain"
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', mainDeck[index].name);
                    e.dataTransfer.setData('application/json', JSON.stringify({ card: mainDeck[index], from: 'main' }));
                  }}
                  onClick={() => setSelectedCard(mainDeck[index])}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainDeck;
