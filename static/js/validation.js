// Agregar un texto (2024) al lado  del corazon ❤️
const h2Anio = document.querySelector('h2') 

h2Anio.insertAdjacentText('beforeend','2024')

const validarFormulario= (evento) => {
    evento.preventDefault()
    
    const primerNombre = document.getElementById("firstname")
    const divErrorPrimerNombre = document.querySelector("#error-firstname")

    divErrorPrimerNombre.innerHTML = ""
    
    let validation = true
    if (primerNombre.value === "") {    
        divErrorPrimerNombre.insertAdjacentText("afterbegin","El nombre no puede ser vacio!!!")
        validation = false
    }

    // password
    const clave = document.getElementById("password")
    const divErrorClave = document.querySelector("#error-password")
    divErrorClave.innerHTML = ""
    
    if (clave.value.length < 6) {
        
        divErrorClave.insertAdjacentText("afterbegin","La pass debe superar los 6 caracteres ")
        validation = false

    }

    // Validacion de correo
    const email = document.getElementById("email");
    const divErrorEmail = document.querySelector("#error-email");
    divErrorEmail.innerHTML = "";
    
    if (!email.value) {
        divErrorEmail.insertAdjacentText("afterbegin", "Por favor, ingresa tu correo electrónico.");
        validation = false;
    } else if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
        divErrorEmail.insertAdjacentText("afterbegin", "Por favor, ingresa un correo electrónico válido.");
        validation = false;
    }

    // Validación de la fecha de nacimiento
    const fechaNacimiento = document.getElementById("birthdate");
    const divErrorFecha = document.querySelector("#error-birthdate");
    divErrorFecha.innerHTML = "";

    const fechaMinima = new Date(1900, 0, 1); // 1 de enero de 1900
const fechaMaxima = new Date(); // Fecha actual

if (!fechaNacimiento.value) {
    divErrorFecha.insertAdjacentText("afterbegin", "Por favor, selecciona tu fecha de nacimiento.");
    validation = false;
} else {
    const fechaSeleccionada = new Date(fechaNacimiento.value);
    if (fechaSeleccionada < fechaMinima || fechaSeleccionada > fechaMaxima) {
        divErrorFecha.insertAdjacentText("afterbegin", "La fecha de nacimiento debe estar entre 1900 y el año actual.");
        validation = false;
    }
}

    // Validación del checkbox de términos
    const terminos = document.getElementById("terms");
    const divErrorTerminos = document.querySelector("#error-terms");
    divErrorTerminos.innerHTML = "";

    if (!terminos.checked) {
        divErrorTerminos.insertAdjacentText("afterbegin", "Debes aceptar los términos y condiciones.");
        validation = false;
    }

    // Si todas las validaciones pasan, guardar en localStorage
    if (validation) {
        // Obtener datos del formulario
        const formData = {
            firstname: primerNombre.value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            password: clave.value,
            birthdate: fechaNacimiento.value,
            country: document.getElementById("country").value
        }

        // Guardar en localStorage
        localStorage.setItem('formData', JSON.stringify(formData))
        
        // Redireccionar o hacer cualquier acción adicional
        window.location.href = '../index.html'
    }

    return validation;
}

// agregar el listener al formulario

const formularioRegistro = document.querySelector("#formRegister")
formularioRegistro.addEventListener('submit',validarFormulario)