import { API_MOVIES } from './config.js';

document.getElementById('movieForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const movieId = document.getElementById('movieId').value; // Obtener el ID de la película (si está en modo edición)
  const title = document.getElementById('title').value;
  const release_year = document.getElementById('release_year').value;
  const adult = document.getElementById('adult').checked ? 1 : 0;
  const imagen = document.getElementById('imagenPeli').files[0];

  let formData = new FormData();
  formData.append('title', title);
  formData.append('release_year', release_year);
  formData.append('adult', adult);
  formData.append('imagen', imagen);

  let url = `${API_MOVIES}/movies`;
  let method = 'POST';

  if (movieId) {
    // Si hay un ID de película, estamos en modo edición
    url += `/${movieId}`;
    method = 'PUT'; // Usar el método PUT para actualizar la película existente

  }

  fetch(url, {
    method: method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadMovies(); // Recarga la lista de películas después de agregar una nueva
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al agregar la película.';
    console.error('Error:', error);
  });
});


function loadMovies() {
  fetch(`${API_MOVIES}/movies`)
    .then(response => response.json())
    .then(data => {
      const moviesList = document.getElementById('moviesList');
      moviesList.innerHTML = ''; // Limpiar la lista existente

      data.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.innerHTML = `
          <span>${movie.title} (${movie.release_year})</span>
          <div>
            <button onclick="editMovie(${movie.id_movie })">Editar</button>
            <button onclick="deleteMovie(${movie.id_movie})">Borrar</button>
          </div>
        `;
        moviesList.appendChild(movieItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar las películas:', error);
    });
}

window.deleteMovie = (id) => {
  fetch(`${API_MOVIES}/movies/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadMovies(); // Recarga la lista de películas después de borrar una
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al borrar la película.';
    console.error('Error:', error);
  });
}

// Usar función flecha para editar la película y asignarla al objeto window
window.editMovie = (id) => {
  // Obtener la película por su ID y cargar los datos en el formulario
  fetch(`${API_MOVIES}/movies/${id}`)
    .then(response => response.json())
    .then(movie => {
      // Llenar el formulario con los datos de la película
      document.getElementById('movieId').value = movie.id_movie;
      document.getElementById('title').value = movie.title;
      document.getElementById('release_year').value = movie.release_year;
      document.getElementById('adult').checked = movie.adult === 1;
      document.getElementById('btnSave').innerText = 'Guardar Cambios';

      
    })
    .catch(error => {
      console.error('Error al obtener la película para editar:', error);
    });
};

// Función para limpiar el formulario después de guardar cambios o cancelar
const clearForm = () => {
  document.getElementById('movieId').value = '';
  document.getElementById('title').value = '';
  document.getElementById('release_year').value = '';
  document.getElementById('adult').checked = false;

  // Restaurar el texto original del botón de submit
  document.querySelector('button[type="submit"]').innerText = 'Agregar Película';
};

// Cancelar la edición y limpiar el formulario al hacer clic en "Cancelar"
document.getElementById('cancelEdit').addEventListener('click', clearForm);

// Cargar las películas cuando la página se cargue por primera vez
document.addEventListener('DOMContentLoaded', loadMovies);
