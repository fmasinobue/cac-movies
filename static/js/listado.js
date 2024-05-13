const API_MOVIES = "./static/data/movies.json"

const obtenerPelis = async () => {

    const resultado = await fetch(API_MOVIES)
    const data = await resultado.json()

    const pelis = data.results
    console.log(pelis)
    // Seleccionar el contenedor donde se mostrarán las películas
    let divTrending = document.querySelector('#trending-list')

    // Iterar sobre cada película y crear su elemento HTML
    for (let i = 0; i < pelis.length; i++) {
        // Crear el HTML para la película actual
        const PeliAInsertar =`
        <div class="movie-item">
                    <a href="./templates/detail-movie.html" target="_blank">
                        <img src="./static/img/avengerInfinityWar.jpg" width="250" alt="" class="movie-item-img">
                        <div class="movie-item-detail">
                            <p class="movie-item-detail-title">${i}</p>
                            <p class="movie-item-detail-subtitle">2020 - 9.6</p>
                        </div>
                    </a>
                </div>
        
        `;

        // Insertar el HTML de la película en el contenedor
        divTrending.insertAdjacentHTML('beforeend', PeliAInsertar);
    }

}


obtenerPelis()
