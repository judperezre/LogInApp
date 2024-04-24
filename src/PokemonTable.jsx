import React, { useState, useEffect } from 'react';

const PokemonTable = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [generation, setGeneration] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonClick = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      setGeneration(speciesData.generation.name);
    } catch (error) {
      console.error('Error al obtener los detalles del Pokémon:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Pokémon</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {pokemonData.map((pokemon, index) => (
            <tr key={index} onClick={() => handlePokemonClick(pokemon.url)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{pokemon.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPokemon && (
        <div>
          <h3>{selectedPokemon.name}</h3>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>Altura: {selectedPokemon.height}</p>
          <p>Peso: {selectedPokemon.weight}</p>
          <p>Tipo(s): {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
          <p>Generación: {generation}</p>
          <h4>Estadísticas:</h4>
          <ul>
            {selectedPokemon.stats.map((stat, index) => (
              <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonTable;