// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyB1Ilsod4YCE16kKZiF60xpfNuQVcE-zrk',
    authDomain: 'loginandcrud-db3fd.firebaseapp.com',
    projectId: 'loginandcrud-db3fd'
});

var db = firebase.firestore();

//Agregar documentos
function guardar() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);

            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

//Leer Documentos
var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>
        `;
        console.log(`${doc.id} => ${doc.data().first}`);
    });
});

//Borrar Documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

//Editar un Documento

function editar(id, nombre, apellido, fecha) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    var boton = document.getElementById('boton');

    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        var washingtonRef = db.collection("users").doc(id);

        // Set the "capital" field of the city 'DC'

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let fecha = document.getElementById('fecha').value;

        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
            .then(() => {
                console.log("Document successfully updated!");
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';
                boton.innerHTML = 'Guardar';
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}