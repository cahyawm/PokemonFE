const currentURL = window.location.href;

const idPattern = /[\?&]id=([^&]+)/;

const match = currentURL.match(idPattern);

let id;
if (match) {
id = match[1];
}

fetch(
  'https://pokeapi.co/api/v2/pokemon/' + id
)
  .then((response) => response.json())
  .then((pokemon) => {
    console.log(pokemon);
    document.getElementById("pokemonModalLabel").append(pokemon.name)
    document.getElementById("linkImg").setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`);
    document.getElementById("pokemonHeight").append(pokemon.height)
    document.getElementById("pokemonWeight").append(pokemon.weight)
})

fetch(
    'https://pokeapi.co/api/v2/pokemon-species/' + id
  )
    .then((response) => response.json())
    .then((pokemon) => {
      console.log(pokemon);
      document.getElementById("pokemonDesc").append(pokemon.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text) 
})