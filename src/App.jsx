import React, { useEffect, useState } from "react";
import {
  addCatchedPokemon,
  deleteCatchedPokemon,
  getCatchedPokemons,
  getPokemons,
} from "./api/Api";
import Pokemon from "./components/Pokemon";
import Lottie from "react-lottie";
import animationData from "./components/96855-pokeball-loading-animation.json";

// hilangkan semua pure DOM
// rubah pemanggilan component (jangan seperti panggil function)
// tambahkan loading

const App = () => {
  const [catchedPokemon, setCatchedPokemon] = useState({});
  const [catchedPokemons, setCatchedPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [showPokemonList, setShowPokemonList] = useState(true);
  const [showCatchedPokemon, setShowCatchedPokemon] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const addPokemon = async (pokemon) => {
    if (pokemon.name) {
      await addCatchedPokemon(pokemon);
      setCatchedPokemons(await getCatchedPokemons());
      alert(`${pokemon.name} Berhasil Ditangkep!`);
    } else {
      alert("ini pokemon GG!");
    }
  };

  const deletePokemon = async (pokemons) => {
    await deleteCatchedPokemon(pokemons.id);
    alert(`${pokemons.name} Berhasil Dilepas!`);
    setCatchedPokemons(await getCatchedPokemons());
  };

  const choosePokemon = async (pokemon) => {
    console.log(pokemon);
    setCatchedPokemon(pokemon);
  };

  const togglePokemonList = () => {
    setShowPokemonList(!showPokemonList);
  };
  const toggleCatchedPokemon = () => {
    setShowCatchedPokemon(!showCatchedPokemon);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setPokemons(await getPokemons());
      setCatchedPokemons(await getCatchedPokemons());
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-animation">
          <Lottie options={{ animationData }} height={200} width={200} />
        </div>
      ) : (
        <>
          <div
            id="chosen-one"
            className="max-w-sm mx-auto rounded overflow-hidden shadow-lg p-4 bg-indigo-500 text-white mb-8"
          >
            <h2 className="font-bold text-xl mb-2 text-center">
              Sang Terpilih
            </h2>
            <img
              className="my-4 mx-auto h-64"
              src={
                catchedPokemon.sprites
                  ? catchedPokemon.sprites.other.dream_world.front_default
                  : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
              }
            />
            <p className="font-bold text-xl mb-2 text-center">
              {catchedPokemon.name}
            </p>
            <button
              id="tangkap-btn"
              className="rounded bg-white text-indigo-500 p-4 w-full font-bold"
              onClick={() => addPokemon(catchedPokemon)}
            >
              {catchedPokemon.name ? "Tangkap" : "Pikachu Gabisa Ditangkep"}
            </button>
          </div>
          <button
            className="rounded bg-indigo-500 text-white p-4 w-full font-bold mb-4"
            onClick={togglePokemonList}
          >
            {showPokemonList
              ? "Sembunyikan Daftar Pokemon"
              : "Tampilkan Daftar Pokemon"}
          </button>
          {showPokemonList && (
            <div id="pokemon-list" className="grid grid-cols-4 gap-4">
              {pokemons.map((p) => {
                return (
                  <Pokemon
                    key={p.id}
                    pokeDet={p}
                    mode="catch"
                    btnHandler={choosePokemon}
                  />
                );
              })}
            </div>
          )}
          <button
            className="rounded bg-indigo-500 text-white p-4 w-full font-bold mt-4"
            onClick={toggleCatchedPokemon}
          >
            {showCatchedPokemon
              ? "Sembunyikan Hasil Tangkapan"
              : "Hasil Tangkapan"}
          </button>
          {showCatchedPokemon && (
            <>
              <h1 className="font-bold text-xl mb-2 text-center mt-16">
                Hasil tangkapan
              </h1>
              <div id="hasil-tangkapan" className="grid grid-cols-4 gap-4 mt-4">
                {catchedPokemons.map((p) => {
                  return (
                    <Pokemon
                      key={p.id}
                      pokeDet={p}
                      mode="release"
                      btnHandler={deletePokemon}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
