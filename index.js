const incidencies = [
  {
    id: 1,
    titol: "Ordinador no arrenca",
    descripcio: "L'ordinador de recepció no encén.",
    estat: "obert",
    prioritat: "alta",
    dataCreacio: "2025-09-20",
    assignat: "Joan García"
  },
  {
    id: 2,
    titol: "Problema amb impressora",
    descripcio: "No imprimeix documents PDF.",
    estat: "proces",
    prioritat: "mitjana",
    dataCreacio: "2025-09-21",
    assignat: "Maria López"
  },
  {
    id: 3,
    titol: "Actualització de software",
    descripcio: "Cal actualitzar l'antivirus.",
    estat: "proces",
    prioritat: "baixa",
    dataCreacio: "2025-09-22",
    assignat: "Pere Martínez"
  },
  {
    id: 4,
    titol: "Canvi de monitor",
    descripcio: "El monitor mostra línies estranyes.",
    estat: "obert",
    prioritat: "mitjana",
    dataCreacio: "2025-09-23",
    assignat: "Anna Torres"
  },
  {
    id: 5,
    titol: "Recuperació de fitxers",
    descripcio: "S'han esborrat fitxers importants.",
    estat: "tancat",
    prioritat: "alta",
    dataCreacio: "2025-09-23",
    assignat: "Carlos Ruiz"
  }
];

const tabla = document.querySelector("#tabla");

function renderizar() {

  tabla.innerHTML = "";
  for (let i = 0; i < incidencies.length; i++) {
    tabla.innerHTML += `
      <tr>
        <td>${incidencies[i].id}</td>
        <td>${incidencies[i].titol}</td>
        <td>${incidencies[i].descripcio}</td>
        <td>${incidencies[i].estat}</td>
        <td>${incidencies[i].prioritat}</td>
        <td>${incidencies[i].assignat}</td>
        <td>${incidencies[i].dataCreacio}</td>
      </tr>
    `;
  }
}
renderizar();

const total = document.querySelector("#total");
for(let i = 0; i< incidencies.length; i++){
    numeroid = incidencies[i].id;  

}

total.innerHTML = `
    <span id="total" class="kpi-number">${numeroid}</span>
`


const oberta = document.querySelector("#oberta");

let obert = 0;
for (let i = 0; i < incidencies.length; i++) {
    if (incidencies[i].estat === "obert") {
        obert++;
    }
}

if (oberta !== null) {
  oberta.innerHTML = `<span class="kpi-number" id="oberta">${obert}</span>`;
}



const proces = document.querySelector("#proces");
let process = 0;

for (let i = 0; i < incidencies.length; i++) {
    if (incidencies[i].estat === "proces") {
        process++;
    }
}

if (proces !== null) {
    proces.innerHTML = `<span id="proces" class="kpi-number">${process}</span>`;
}



const tancades = document.querySelector("#tancades");
let tancadess = 0;

for (let i = 0; i < incidencies.length; i++) {
    if (incidencies[i].estat === "tancat") {
        tancadess++;
    }
}

if (tancades !== null) {
        tancades.innerHTML = `<span id="tancades" class="kpi-number">${tancadess}</span>`;
}




const modal = document.querySelector("#modal-incidencia");
const form = document.querySelector("#form-incidencia");

document.querySelector("#incidencia").onclick = (e) => {
  e.preventDefault();
  modal.classList.add("modal_mostrar");
};

const cerrarModal = () => modal.classList.remove("modal_mostrar");
document.querySelector("#btn-cerrar").onclick = cerrarModal;
document.querySelector("#btn-cancelar").onclick = cerrarModal;


form.onsubmit = function (e) {
  e.preventDefault();


  const hoy = new Date().toLocaleDateString('es-ES');


  const nuevaIncidencia = {
    id: incidencies.length > 0 ? incidencies[incidencies.length - 1].id + 1 : 1,
    titol: document.querySelector("#titulo").value,
    descripcio: document.querySelector("#descripcion").value,
    estat: document.querySelector("#estat-form").value,
    prioritat: document.querySelector("#prioritat-form").value,
    assignat: document.querySelector("#asignado").value,
    dataCreacio: hoy
  };

incidencies.push(nuevaIncidencia);
    renderizar();
    form.reset();

    const localIncidencias = JSON.stringify(incidencies);
    localStorage.getItem("local");
    localStorage.setItem("misIncidencias", localIncidencias)

};

for(let i=0; i<incidencies.length; i++){
    if(incidencies[i].estat = "obert"){
        
    }
}

// --- CÓDIGO NUEVO PARA FILTRAR ---
const selectEstat = document.querySelector("#estat");
const selectPrioritat = document.querySelector("#prioritat");

function aplicarFiltro() {
  // Tomamos solo las filas creadas dentro de tbody
  const filas = document.querySelectorAll("#tabla tr");

  for (let i = 0; i < incidencies.length; i++) {
    // Normalizamos 'en-proces' a 'proces' si hace falta
    const estatSeleccionat = selectEstat.value.replace("en-", "");
    
    const coincideEstat = selectEstat.value === "tots" || incidencies[i].estat === estatSeleccionat;
    const coincidePrioritat = selectPrioritat.value === "totes" || incidencies[i].prioritat === selectPrioritat.value;

    if (filas[i]) {
      if (coincideEstat && coincidePrioritat) {
        filas[i].style.display = "";
      } else {
        filas[i].style.display = "none";
      }
    }
  }
}

selectEstat.onchange = aplicarFiltro;
selectPrioritat.onchange = aplicarFiltro;