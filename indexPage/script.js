const form = document.querySelector('form')
const search = document.querySelector('.search')
const prev = document.querySelector('#prev-btn')
const next = document.querySelector('#next-btn')
const linkBtn = document.querySelector('#library')
let pokemonID = ''

const fetchPokemon = async (pokemon) =>{
    const apiresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    
    const valid = apiresponse

    if(valid.status == 200){
        const data = await apiresponse.json()
        return data;
    }else{
        return 'nof'
    }
   
}

const showPokemon = async (pokemon) =>{
    const pokemonImage = document.querySelector('.pokemon')
    const pokemonName = document.querySelector('.pokemon_name')
    const pokemonNumber = document.querySelector('.pokemon_number')

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    pokemonImage.src = ''

    const data = await fetchPokemon(pokemon)
    pokemonID = data.id

    if(pokemonID > 649){
        pokemonName.innerHTML = 'Not Found'
    }
    else if(data == 'nof'){
        pokemonName.innerHTML = 'Not Found'
    }else if(pokemonID <= 649){
        pokemonName.innerHTML = `<span>-</span> ${data.name}`
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    showPokemon(search.value)
})

prev.addEventListener('click', () => {
    
    if(pokemonID > 1){
        pokemonID -= 1
        showPokemon(pokemonID)
    }
})

next.addEventListener('click', () => {
    pokemonID += 1
    showPokemon(pokemonID)
})
linkBtn.addEventListener('click', () => {
    window.location.href='http://127.0.0.1:5500/Poked%C3%A9x/secondPage/library.html'
})
