function registrar() {
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .then((user) => {
            // Signed in
            // ...
        }).then(function () {
            verificar();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage)
        });
}

function ingreso() {

    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
        .then((user) => {
            // Signed in
            // ...
            console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage)

        });
}

function observador() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('Existe usuario activo')
            aparece(user);

            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...

            console.log('****************')
            console.log(user.emailVerified)
            console.log('****************')

        } else {
            // User is signed out
            // ...

            console.log('No existe usuario activo')

            contenido.innerHTML = `

            <div class="container">
            <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <hr>
      <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
        
        <button onclick="cerrar()" class="btn btn-danger ml-2">Cerrar Sesion</button>
            </div>
            
        `;
        }
    });
}

observador();

function aparece(user) {
    var user = user;
    var contenido = document.getElementById('contenido');

    if (user.emailVerified) {
        contenido.innerHTML = `

        <div class="container">
        <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
    
    <button onclick="cerrar()" class="btn btn-danger ml-2">Cerrar Sesion</button>
        </div>
        
    `;
    }

}

function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Saliendo')
            var contenido = document.getElementById('contenido').innerHTML = '';
        }).catch(function (error) {
            console.log(error)
        })
}

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Enviando correo')
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}