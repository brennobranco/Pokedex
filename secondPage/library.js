const backBtn = document.querySelector('#back')

backBtn.addEventListener('click', () =>{
    window.location.href = 'http://127.0.0.1:5500/Poked%C3%A9x/indexPage/index.html'
})

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    const data = await APIresponse.json()

    return data
}

const loop = async () => {
    for(let a = 1; a <= 649; a++){
    const data = await fetchPokemon(a)
    const type = data['types']['0']['type']['name'];
    
    loadCard(data, type)
    }
}

const creatCard = (info) => {
    const data = info

    const imgPokemon = data['sprites']['versions']['generation-v']['black-white']['front_default'];
    const name = data.name;
    const id = data.id;
    const type = data['types']['0']['type']['name'];


    const elementHtml = `
        <div class="img_circle">
            <img src="${imgPokemon}" alt="" class="pokemon">
        </div>

        <div class="id">${id}</div>

        <h2 class="name">${name}</h2>

        <div class="type">${type}</div>
    `
    return elementHtml
}
const loadCard = (info, type) => {
    const container = document.querySelector('.container')
    const div = document.createElement('div')
    div.innerHTML = creatCard(info)

    div.classList.add('card')
    div.setAttribute('id', `${type}`)
    container.appendChild(div)
}
document.addEventListener("DOMContentLoaded", loop)