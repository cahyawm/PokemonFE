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
            const card = document.createElement("div");
            card.className =
              "relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

            card.innerHTML = `
              <div class="absolute top-3 right-3 text-[#D5D6C6] text-3xl font-bold px-2 py-1">
                #${pokemonData.id}
              </div>
              <img class="rounded-t-lg" src="${pokemonData.sprites.other.home.front_default}" alt="${pokemonData.name}"/>
              <div class="px-5 pb-5">
                <h5 class="mb-2 mt-2 text-2xl font-bold tracking-tight text-[#2B4020] dark:text-white">${pokemonData.name} </h5>
                <p class="mb-3 mt-3 font-normal text-[#2B4020] dark:text-white">${getDescription(pokemonData)}</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-[#5E7C60] text-[#F9F5F2]">
                  Read more
                  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
            `;

            container.appendChild(card);
          });
      });
    });

  function getDescription(pokemonData) {
    // Customize this part to get the desired description for the Pokemon.
    // For example, you can extract it from the 'pokemonData' object.
    // You might need to fetch additional data or parse the existing data.
    return "This is the description for " + pokemonData.name + ".";
  }
});
