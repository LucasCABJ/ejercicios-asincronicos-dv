import { cajas } from './cajas.js';
import { clientes } from './clientes.js';

const siguienteBtn = document.querySelector("#siguiente-btn");

const drawCajaCard = (caja) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("p-2", "col-4");
    const card = document.createElement('div');
    card.classList.add("card", "p-3");
    const cardBody = document.createElement('div');
    cardBody.innerHTML = `
    <h5 class="card-title fs-2">Caja Número #${caja.numero}</h5>
    <p class="card-text mb-1 fs-4">Cajero: ${caja.cajera_o}</p>
    <p class="card-text fs-4">Atendiendo: <b>${caja.cliente_atendiendo ? caja.cliente_atendiendo.apellido+' '+caja.cliente_atendiendo.nombre : "Ninguno/a"}</b></p>
    `;
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    return cardContainer;
}

const drawCajaCliente = (cliente) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("p-2", "col-12");
    const card = document.createElement('div');
    card.classList.add("card", "p-3");
    const cardBody = document.createElement('div');
    cardBody.innerHTML = `
    <h5 class="card-title">Cliente#${cliente.nro}</h5>
    <p class="card-text mb-1">Nombre: ${cliente.nombre} ${cliente.apellido}</p>
    `;
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    return cardContainer;
}

const actualizarCajas = () => {
    const contenedorCajas = document.querySelector("#contenedor-cajas");
    contenedorCajas.innerHTML = "";
    cajas.forEach(caja => {
        contenedorCajas.appendChild(drawCajaCard(caja));
    });
}

const actualizarClientes = () => {
    const contenedorClientes = document.querySelector("#contenedor-clientes");
    contenedorClientes.innerHTML = "";
    clientes.forEach(cliente => {
        contenedorClientes.appendChild(drawCajaCliente(cliente));
    });
}

siguienteBtn.addEventListener('click', () => {
    let siguiente = obtenerSiguienteEnEspera();
    if(siguiente) {
        asignarCliente(siguiente);
        actualizarCajas();
        actualizarClientes();
    } else {
        alert("No hay clientes que atender")
    }
});

const obtenerSiguienteEnEspera = () => {
    let siguiente = clientes.shift();
    if(siguiente) {
        return siguiente;
    } else {
        return null;
    }
}

const asignarCliente = (cliente) => {
    let cajaDisponible = cajas.find(caja => caja.cliente_atendiendo == null);
    console.log(cajaDisponible);
    if(cajaDisponible) {
        cajaDisponible.cliente_atendiendo = cliente;
        atenderCliente(cajaDisponible);
    } else {
        alert("Todas las cajas se encuentran ocupadas, por favor espere y será atendido.");
    }
}

const atenderCliente = (caja) => {
    setTimeout(() => {
        caja.cliente_atendiendo = null;
        actualizarCajas();
        actualizarClientes();
    }, Math.floor((Math.random() * 6000) + 1000) )
}

// renderizar cajas por primera vez
actualizarCajas();
actualizarClientes();