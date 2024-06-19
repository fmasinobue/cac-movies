import { API_MOVIES } from './config.js';
document.getElementById('movieForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const release_year = document.getElementById('release_year').value;
  const adult = document.getElementById('adult').checked ? 1 : 0;

  const data = {
      title: title,
      release_year: parseInt(release_year),
      adult: adult,
      poster_url: ""
  };

  fetch(API_MOVIES, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
