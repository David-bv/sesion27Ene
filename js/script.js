
import { url as enlace } from "./url.js";

 //Renderizar card 
const card = document.getElementById('renderCard')

const renderCard = async () => {
    const resp = await fetch(enlace)
    const data = await resp.json()

    data.forEach(element => {
        const {imagen, nombre, genero, descripcion, id } = element 
       /*  console.log(imagen, nombre, genero, descripcion, id) */
        card.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <img src=${imagen} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <h6 class="cardSubtitulo">${genero}</h6>
                    <p class="card-text">${descripcion}</p>
                </div>
            </div>
        </div>
        `
    });
}
document.addEventListener('DOMContentLoaded', renderCard)

//Renderizar listado Formulario
const ul = document.querySelector('.list-group')

const getLista = async () => {
    const resp = await fetch(enlace)
    const data = await resp.json()
    data.forEach(element => {
        const {imagen, nombre, genero, descripcion, id} = element 
        ul.innerHTML += `
        <li class="list-group-item">
            <h5 class='text-center py--2'>Nombre:${nombre}</h5>
            <h6 ><b>Género:</b> ${genero}</h6>
            <div> <img src=${imagen} width="50px" class='imgList'></img> </div>
            <p class='textcenter py-1'><b>Descripción:</b> ${descripcion}</p>
            <button type="submit" id='${id}' class="btn btn-primary d-flex mx-auto btnDelete">Eliminar</button>
        </li>
        `
    });
}
document.addEventListener('DOMContentLoaded', getLista)

//Capturar datos
const obtenerData = () => {
    const imagen = document.getElementById('img').value
    const nombre = document.getElementById('nombre').value 
    const genero = document.getElementById('genero').value 
    const descripcion = document.getElementById('descripcion').value 
   
    const anime = {
        imagen,
        nombre,
        genero,
        descripcion
    }
    return anime;
}

//Ingresar información
let formulario = document.getElementById("form");

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const objeto = obtenerData();

    await fetch(enlace, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
})

//Buscar
const buscar = document.getElementById('buscarBtn');

buscar.addEventListener('click', async() => {
    const input = document.getElementById('nombre').value;
    const resp = await fetch(enlace);
    const data = await resp.json()
    const buscar = data.find(find => find.nombre.toLocaleLowerCase() === input.toLocaleLowerCase())
    
    if (buscar !== undefined) {
        const {imagen, nombre, genero, descripcion, id} = buscar;
        document.getElementById('img').value = imagen;
        document.getElementById('nombre').value = nombre;
        document.getElementById('genero').value = genero;
        document.getElementById('descripcion').value = descripcion;
        document.getElementById('id').value = id;
        buscar.value = ''
    } else {
        alert('Error! Anime no encontrado')
    }
})

//Actualizar información
const modificar = document.getElementById('modificarBtn');

modificar.addEventListener('click', async () => {

    console.log('ok')
    const dataActualizar = obtenerData();
    const {imagen, nombre, genero, descripcion} = dataActualizar;
   
    if(imagen === "",nombre === "",genero === "",descripcion === ""){
        alert('Llenar todos los campos')
    }
    else{
        const id = document.getElementById('id').value;
        await fetch(enlace + id, {
            method: 'PUT',
            body: JSON.stringify(dataActualizar),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    } 
})

ul.addEventListener('click', e => {
    const eliminar = e.target.classList.contains('btnDelete')
    if(eliminar){
        const id = e.target.id;
        fetch(enlace + id, {
            method: 'DELETE'
        })
    }
})
