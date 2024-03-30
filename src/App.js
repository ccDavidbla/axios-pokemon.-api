import React, { useState } from "react";
import "./styles.css";
import axios from 'axios';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(false);

  const fetchPokemons = async () => {
    setCargando(true);
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=807");
      const data = response.data;
      setPokemons(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };


  const renderPokemons = () => {
    return (
      <ul className="lista-pokemons">
        {pokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <h1>Pokédex</h1>
      <button onClick={fetchPokemons} className="boton-fetch">
        Fetch Pokemon
      </button>
      {cargando ? (
        <p>Cargando...</p>
      ) : pokemons.length > 0 ? (
        renderPokemons()
      ) : (
        <p>No hay Pokémons cargados aún.</p>
      )}
    </div>
  );
};

export default App;
