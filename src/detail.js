const currentURL = window.location.href;

const idPattern = /[\?&]id=([^&]+)/;

// Use the pattern to extract the "id" value
const match = currentURL.match(idPattern);

// Check if there is a match and get the "id" value
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