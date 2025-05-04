import React from 'react';
import axios from 'axios';

function SearchBar({ searchTerm, setSearchTerm, setSearchResults }) {
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/search/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar cartas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded mb-2 text-black"
      />
      <button
        onClick={handleSearch}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;

