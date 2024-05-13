const verScroll = function() {
    const navbar = document.querySelector('header')
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
}

window.addEventListener('scroll', verScroll )

// Función para obtener el nombre del localStorage
const obtenerNombreLocalStorage = () => {
  const formDataString = localStorage.getItem('formData');
  if (formDataString) {
      const hola = JSON.parse(formDataString);
      return hola.firstname;
  } else {
      return null; // Si no hay información en localStorage
  }
}


const nombreGuardado = obtenerNombreLocalStorage();
if (nombreGuardado) {
  console.log(`¡Hola, ${nombreGuardado}!`);
  const enlaceUsuario = document.querySelector('#usuario')
  enlaceUsuario.innerHTML=""
  enlaceUsuario.insertAdjacentText('afterbegin',nombreGuardado)
} else {
  console.log("No se encontró información en el localStorage.");
}

