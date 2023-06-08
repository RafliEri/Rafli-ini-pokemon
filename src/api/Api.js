export const getPokemons = async () => {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await resp.json();
  const results = data.results;
  const urls = results.map((e) => e.url);

  const allPromise = urls.map(async (el) => {
    const resp = await fetch(el);
    const data = await resp.json();
    return data;
  });

  return Promise.all(allPromise);
};

export const getCatchedPokemons = async () => {
  const resp = await fetch("https://kobarsept.com/api/catch?userID=6");
  const result = await resp.json();
  return result.data;
};

export const addCatchedPokemon = async (catchedPokemon) => {
  const resp = await fetch("https://kobarsept.com/api/catch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: catchedPokemon.name,
      imageUrl: catchedPokemon.sprites.other.dream_world.front_default,
      area: catchedPokemon.location_area_encounters,
      userID: 6,
    }),
  });
  const data = await resp.json();
  if (data.message) {
    return {
      id: catchedPokemon.id,
      name: catchedPokemon.name,
      imageUrl: catchedPokemon.imageUrl,
      area: catchedPokemon.area,
    };
  }
};

export const deleteCatchedPokemon = async (id) => {
  const resp = await fetch(
    `https://kobarsept.com/api/catch?userID=6&id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return resp.json();
};
