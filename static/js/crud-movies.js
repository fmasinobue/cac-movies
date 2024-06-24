import { API_MOVIES } from './config.js';
document.getElementById('movieForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const title = document.getElementById('title').value
  const release_year = document.getElementById('release_year').value
  const adult = document.getElementById('adult').checked ? 1 : 0

//   obtenemos la imagen que vamos a subir  
// obtener el primer archivo seleccionado en un campo de entrada de tipo file en un formulario HTML
const imagen = document.getElementById('imagenPeli').files[0]
console.log("IMAGEN", imagen, "TIPO: ", typeof(imagen))




//   FormData (formData):

//   Es una interfaz específica de JavaScript para construir un conjunto de pares clave/valor 
//   que pueden incluir no solo datos simples sino también archivos binarios.

//   FormData es la elección correcta para enviar datos de formularios que incluyen 
//   archivos a través de una solicitud HTTP.

let formData = new FormData()
formData.append('title',title)
formData.append('release_year',release_year)
formData.append('adult',adult)
formData.append('imagen',imagen)

  fetch(`${API_MOVIES}/movies`, {
      method: 'POST',
      body: formData // Aquí enviamos formData en lugar de JSON
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('message').innerText = data.message;
  })
  .catch(error => {
      document.getElementById('message').innerText = 'Error al agregar la película.';
      console.error('Error:', error);
  });
});
