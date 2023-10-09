
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>                
            </li>
        `).join('')
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, limit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// No seu arquivo main.js
const pokemonDetailsContainer = document.getElementById('pokemonDetails');

// Função para carregar e inserir a seção de detalhes do Pokémon no DOM
function loadPokemonDetails() {
    fetch('pokemon-details.html')
        .then(response => response.text())
        .then(data => {
            pokemonDetailsContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar detalhes do Pokémon:', error);
        });
}

// Chame a função para carregar os detalhes do Pokémon
loadPokemonDetails();

// No seu arquivo main.js
const pokemonDetails = document.querySelector('.pokemon-details');


// Chame a função para carregar os detalhes do Pokémon
loadPokemonDetails();

// Adicione um evento de clique para os Pokémon na lista
pokemonList.addEventListener('click', async (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        // Recupere os detalhes do Pokémon clicado (você precisará implementar isso)
        const pokemonName = clickedPokemon.querySelector('.name').textContent;
        const pokemonDetailsData = await pokeApi.getPokemonDetails(pokemonName);

        // Atualize a seção de detalhes com os dados do Pokémon
        displayPokemonDetails(pokemonDetailsData);
    }
});

// Função para exibir os detalhes do Pokémon na seção de detalhes
function displayPokemonDetails(pokemonDetailsData) {
    const nameElement = pokemonDetails.querySelector('.name');
    const numberElement = pokemonDetails.querySelector('.number');
    const typeElement = pokemonDetails.querySelector('.type');
    const imageElement = pokemonDetails.querySelector('.pokemon-image');

    // Atualize os elementos HTML com os dados do Pokémon
    nameElement.textContent = `Nome: ${pokemonDetailsData.name}`;
    numberElement.textContent = `Número: #${pokemonDetailsData.number}`;
    typeElement.textContent = `Tipo: ${pokemonDetailsData.types.join(', ')}`;
    imageElement.src = pokemonDetailsData.photo;

    // Exiba a seção de detalhes (você pode estilizar isso com CSS)
    pokemonDetails.style.display = 'block';
}

