const Pokemon = ({ mode, pokeDet, btnHandler }) => {
  const pokeNih = pokeDet;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <h2 className="font-bold text-xl mb-2 text-center">{pokeDet.name}</h2>
      <img
        className="my-4 mx-auto h-32"
        src={
          mode === "release"
            ? pokeNih.imageUrl
            : pokeDet.sprites.other.dream_world.front_default
        }
        alt={pokeDet.name}
      />
      <button
        className="rounded bg-indigo-500 text-white p-4 w-full"
        onClick={(e) => {
          return btnHandler(pokeNih);
        }}
      >
        {mode === "catch" ? "Pilih Pokemon" : "Lepas"}
      </button>
    </div>
  );
};

export default Pokemon;
