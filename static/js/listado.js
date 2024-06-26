// const API_MOVIES = 'https://api.themoviedb.org/3/movie/popular'
// const API_MOVIES = 'http://localhost:5000/movies'
import { API_MOVIES } from './config.js'



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTI2ZDgzMDU2NjMzNmJhNmU4Mzc2NGIyZjZiZmI2MSIsInN1YiI6IjY1Y2U2NDA0MTNhMzg4MDE4NzlmNjBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZTxSjr1fLqIi2LSwadmPT37grY2IF6y3d4LUHLbEmE'
    }
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
        divTrending.insertAdjacentHTML('beforeend', PeliAInsertar)
    }
    if (pelis.length === 0) {
        divTrending.insertAdjacentHTML('beforeend', "<p>No hay peliculas en el sistema 😮</p>")
    }
}


obtenerPelis()

/*
const agregarPeli = async (newMovie) => {
    const response = await fetch(API_MOVIES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            
        },
        body: JSON.stringify(newMovie)
    });

    const data = await response.json();
    console.log('New Movie Added:', data);
};

// Ejemplo de cómo llamar a agregarPeli con una nueva película
const nuevaPeli = {
    id:120,
    title: "Test",
    release_year: 2010,
    adult: false
};

agregarPeli(nuevaPeli); // Llama para agregar una nueva película
*/