import React, { useEffect, useState } from "react";
import { fetchCharacters } from "./services/api";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import Loader from "./components/Loader";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const dataPage1 = await fetchCharacters(1);
        const dataPage2 = await fetchCharacters(2);
        const dataPage3 = await fetchCharacters(3);

        const allCharacters = [
          ...dataPage1.results,
          ...dataPage2.results,
          ...dataPage3.results,
        ];
        setCharacters(allCharacters);
      } catch (error) {
        setError("Error al cargar los personajes.");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filteredCharacters = characters.filter((character) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      character.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      character.species.toLowerCase().includes(lowerCaseSearchTerm) ||
      character.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app text-center relative">
      <h1 className="bg-slate-800 text-white p-5 text-3xl">Rick and Morty</h1>
      <input
        className="mt-5 p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out transform hover:scale-105 w-80 text-center"
        type="text"
        placeholder="Buscar por: Species, Status, Name"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="character-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 mt-5 p-5 justify-items-center">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="mt-4 text-red-600 bg-red-100 border border-red-300 rounded-lg p-3">
            {error}
          </p>
        ) : (
          currentCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCardClick(character)}
            />
          ))
        )}
      </div>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredCharacters.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
