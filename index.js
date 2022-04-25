fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10")
    .then((response) => response.json())
    .then((response) => {
        response.results.forEach((pokemon) => 
            fetchPokemon(pokemon.url)
        )
    });


function fetchPokemon(url){
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            const types = response.types.map((entry) => entry.type.name);
            const img = response.sprites.front_default;
            const number = response.id;
            const name = response.name;

            addToPokedex(createPokemon(number, name, types, img));
        });
    }
function addToPokedex(pokemon){
    const pokedex = document.querySelector(".pokedex");
    pokedex.appendChild(pokemon);
}

function createPokemon(number, name, types, img){
    const entry = document.querySelector("#pokemon-template").content;
    const pokemon = entry.cloneNode(true);
    pokemon.querySelector(".number").innerText = `#${number}`;
    pokemon.querySelector(".name").innerText = name;
    pokemon.querySelector(".img-container img").src = img;

    if(types){
        const typeInfo = pokemon.querySelector(".type-info");
        typeInfo.innerHTML = "";
        types.forEach(type => {
            const typeEL = document.createElement("span");
            typeEL.classList.add("type");
            typeEL.classList.add(`type-${type.toLowerCase()}`);
            typeEL.innerText = type;
            typeInfo.appendChild(typeEL);
        });
    }

    return pokemon;
}