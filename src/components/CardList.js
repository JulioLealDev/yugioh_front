import React, { useState } from 'react';
import api from '../api';
import CardItem from './CardItem';

function CardList() {
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/search/${search}`);
      setCards(response.data);
    } catch (error) {
      console.error(error);
      setCards([]);
    }
    setLoading(false);
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>Yu-Gi-Oh! Search App</h1>
      <input
        type="text"
        placeholder="Digite o nome da carta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
        Buscar
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {cards.map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardList;
