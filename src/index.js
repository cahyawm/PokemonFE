document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grid");

  fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = data.results;

      pokemonList.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokemonData) => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`)
              .then((response) => response.json())
              .then((pokemonSpeciesData) => {
                const card = document.createElement("div");
                card.className =
                  "relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

                card.innerHTML = `
                  <div class="absolute top-3 right-3 text-[#D5D6C6] text-3xl font-bold px-2 py-1">#${pokemonData.id}</div>
                  <img class="rounded-t-lg" src="${pokemonData.sprites.other.home.front_default}" alt="${pokemonData.name}" style="width: 220px; height: 220px;" />
                  <div class="px-5 pb-5">
                    <h5 class="mb-2 mt-2 text-2xl font-bold tracking-tight text-[#2B4020] dark:text-white">${pokemonData.name}</h5>
                    <p class="mb-3 mt-3 font-normal text-[#2B4020] dark:text-white">${getPokemonDescription(pokemonSpeciesData)}</p>
                      <a href="/src/detail.html?id=${pokemonData.id}" class="text-sm font-medium text-center rounded-lg bg-[#5E7C60] text-[#F9F5F2] block font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                      Read More
                      </a>
                  </div>
                `;
                container.appendChild(card);
              });
          });
      });
    });

  function getPokemonDescription(pokemonSpeciesData) {
    const description = pokemonSpeciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    ).flavor_text;
    return description;
  }
});
