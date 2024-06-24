
import { API_MOVIES } from './config.js'



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'    }
}

const obtenerPelis = async () => {

    const resultado = await fetch(`${API_MOVIES}/movies`, options)
    const data = await resultado.json()

    // const pelis = data.results
    const pelis = data
    console.log(pelis)
    // Seleccionar el contenedor donde se mostrarán las películas
    let divTrending = document.querySelector('#trending-list')

    // Iterar sobre cada película y crear su elemento HTML
    for (let i = 0; i < pelis.length; i++) {
        // Crear el HTML para la película actual
        const PeliAInsertar =`
        <div class="movie-item">
                    <a href="./templates/detail-movie.html" target="_blank">
                        <img src="${API_MOVIES}/static/img/${pelis[i].poster_url}" width="250" alt="" class="movie-item-img">
                        <div class="movie-item-detail">
                            <p class="movie-item-detail-title">${pelis[i].title}</p>
                            <p class="movie-item-detail-subtitle">${pelis[i].release_year}</p>
                        </div>
                    </a>
                </div>
        
        `

        // Insertar el HTML de la película en el contenedor
        divTrending.insertAdjacentHTML('beforeend', PeliAInsertar);
    }
}


obtenerPelis()
