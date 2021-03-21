function registrar() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        verificar();
    })
        .then((user) => {
            // Signed in
            // ...
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..

            console.log(errorCode);
            console.log(errorMessage);
        });
}

function ingresar() {
    let email = document.getElementById('email2').value;
    let password = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in
            // ...
            document.getElementById('email2').value = '';
            document.getElementById('password2').value = '';
            console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message

            console.log(errorCode);
            console.log(errorMessage);
        });
}

function observador() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('Existe usuario activo');

            console.log('*********************');
            console.log(user.emailVerified);
            console.log('*********************');

            aparece(user);

            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...

        } else {
            // User is signed out
            // ...
            console.log('No existe usuario activo')

            contenido.innerHTML = `
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>

        <button class="btn btn-sm
        btn-outline-success" onclick="cerrar()">Cerrar Sesion</button>
    
    `;
        }
    });
}

observador();

function aparece(user) {
    var contenido = document.getElementById('contenido');

    if (user.emailVerified) {
        contenido.innerHTML = `
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>

        <button class="btn btn-sm
        btn-outline-success" onclick="cerrar()">Cerrar Sesion</button>
    
    `;
    }
}

function cerrar() {
    firebase.auth().signOut().then(function () {
        console.log('Saliendo')
    })
        .catch(function (error) {
            console.log(error)
        })
}

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log("Enviando correo");
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}