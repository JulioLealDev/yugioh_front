import React, { useState } from 'react';
import DeckNameInput from './DeckNameInput';
import CardPreview from './CardPreview';
import MainDeck from './MainDeck';
import ExtraDeck from './ExtraDeck';
import SideDeck from './SideDeck';
import SearchBar from './SearchBar';
import CardGallery from './CardGallery';

function DeckEditor() {
  const [deckName, setDeckName] = useState('Novo Deck');
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [extraDeck, setExtraDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedCard, setDraggedCard] = useState(null);
  const cardsPerPage = 72;

  const forbiddenFrameTypesSide = [
   "skill"
  ];

  const forbiddenFrameTypesMain = [
    "skill", "xyz", "fusion", "link", "synchro", "synchro_pendulum", "fusion_pendulum", "xyz_pendulum"
   ];

  const allowedFrameTypesExtra = [
    "xyz", "fusion", "link", "synchro", "synchro_pendulum", "fusion_pendulum", "xyz_pendulum"
  ];

  const countTotalCopies = (cardId) => {
    return [
      ...mainDeck,
      ...extraDeck,
      ...sideDeck
    ].filter(c => c.id === cardId).length;
  };

  const handleAddToMainDeck = (card, isMove = false) => {
    isMove = isMove ?? false; // 👈 forçar false se vier undefined
    if (forbiddenFrameTypesMain.includes(card.frameType)) {
      alert('Esta carta não pode ser adicionada ao Main Deck.');
      return;
    }
    if (!isMove && countTotalCopies(card.id) >= 3) {
      alert('Você só pode adicionar até 3 cópias da mesma carta no deck (Main + Extra + Side)!');
      return;
    }
    if (mainDeck.length < 60) {
      setMainDeck([...mainDeck, card]);
    } else {
      alert('Main Deck já tem 60 cartas!');
    }
  };
  
  const handleAddToExtraDeck = (card, isMove = false) => {
    isMove = isMove ?? false; // 👈 forçar false
    if (!allowedFrameTypesExtra.includes(card.frameType)) {
      alert('Esta carta não pode ser adicionada ao Extra Deck.');
      return;
    }
    if (!isMove && countTotalCopies(card.id) >= 3) {
      alert('Você só pode adicionar até 3 cópias da mesma carta no deck (Main + Extra + Side)!');
      return;
    }
    if (extraDeck.length < 15) {
      setExtraDeck([...extraDeck, card]);
    } else {
      alert('Extra Deck já tem 15 cartas!');
    }
  };
  
  const handleAddToSideDeck = (card, isMove = false) => {
    isMove = isMove ?? false; // 👈 forçar false
    if (forbiddenFrameTypesSide.includes(card.frameType)) {
      alert('Esta carta não pode ser adicionada ao Side Deck.');
      return;
    }
    if (!isMove && countTotalCopies(card.id) >= 3) {
      alert('Você só pode adicionar até 3 cópias da mesma carta no deck (Main + Extra + Side)!');
      return;
    }
    if (sideDeck.length < 15) {
      setSideDeck([...sideDeck, card]);
    } else {
      alert('Side Deck já tem 15 cartas!');
    }
  };
  

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
  
    // 🔥 Setar corretamente o dataTransfer!
    e.dataTransfer.setData('application/json', JSON.stringify(card));
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedCard) {
      handleAddToMainDeck(draggedCard);
      setDraggedCard(null);
    }
  };

  const handleDropOutsideMainDeck = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      try {
        const parsed = JSON.parse(data);

        if (parsed.from === 'main') {
          const updatedMainDeck = [...mainDeck];
          const cardIndex = updatedMainDeck.findIndex(c => c.id === parsed.card.id);
          if (cardIndex !== -1) {
            updatedMainDeck.splice(cardIndex, 1);
            setMainDeck(updatedMainDeck);
          }
        }

      } catch (error) {
        console.error('Erro ao fazer parse fora do Main Deck:', error);
      }
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchResults.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(searchResults.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="grid grid-cols-[30%_40%_30%] h-screen bg-black text-gray-200"
    onDrop={handleDropOutsideMainDeck}
    onDragOver={(e) => e.preventDefault()}>

      {/* Left Column: Deck Name + Card Preview */}
      <div className="bg-white p-4 overflow-y-auto flex flex-col text-black">
        <DeckNameInput deckName={deckName} setDeckName={setDeckName} />
        <CardPreview selectedCard={selectedCard} />
      </div>

      {/* Middle Column: Main Deck / Extra Deck / Side Deck */}
      <div className="bg-black p-4 flex flex-col overflow-y-auto">
        <div className="mb-2" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            <MainDeck
                mainDeck={mainDeck}
                sideDeck={sideDeck}
                extraDeck={extraDeck}
                setSelectedCard={setSelectedCard}
                handleAddToMainDeck={handleAddToMainDeck}
                setMainDeck={setMainDeck}
                setSideDeck={setSideDeck}
                setExtraDeck={setExtraDeck}
                handleDragStart={handleDragStart}
            />
        </div>
        <div className="mb-2">
            <ExtraDeck
                extraDeck={extraDeck}
                setSelectedCard={setSelectedCard}
                handleAddToExtraDeck={handleAddToExtraDeck}
                draggedCard={draggedCard}
                setDraggedCard={setDraggedCard}
                setSideDeck={setSideDeck}
                sideDeck={sideDeck}
            />
        </div>
        <div>
          <SideDeck
                sideDeck={sideDeck}
                mainDeck={mainDeck}
                setMainDeck={setMainDeck}
                extraDeck={extraDeck}
                setExtraDeck={setExtraDeck}
                setSelectedCard={setSelectedCard}
                handleAddToSideDeck={handleAddToSideDeck}
                draggedCard={draggedCard}
                setDraggedCard={setDraggedCard}
            />
        </div>
      </div>

      {/* Right Column: Search and Card Gallery */}
      <div className="bg-white p-4 overflow-y-auto flex flex-col text-black">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} />
        <CardGallery searchResults={currentCards} setSelectedCard={setSelectedCard} handleDragStart={handleDragStart} />
        {searchResults.length > cardsPerPage && (
          <div className="flex justify-between items-center mt-2">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Página Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Próxima Página
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default DeckEditor;
