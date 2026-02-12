let puntaje = 0;
let indiceActual = 0;
let objetoActual = null;

const objetosData = [
  { src: "img/serv.png", categoria: "no-aprovechable", alt: "servilleta" },
  { src: "img/cp.png", categoria: "organico", alt: "cáscara de plátano" },
  { src: "img/btlv.png", categoria: "reciclable", alt: "botella gaseosa" },
  { src: "img/jeringa.png", categoria: "no-aprovechable", alt: "jeringa" },
  { src: "img/vaso.png", categoria: "reciclable", alt: "vaso cartón" },
  { src: "img/btlv.png", categoria: "reciclable", alt: "botella plástico" },
  { src: "img/ph.png", categoria: "no-aprovechable", alt: "papel higiénico" }
];

const contenedorObjetos = document.getElementById("objetos");
const canecas = document.querySelectorAll(".caneca");
const puntajeEl = document.getElementById("puntaje");

function crearObjeto(data) {
  const img = document.createElement("img");
  img.src = data.src;
  img.className = "objeto";
  img.draggable = true;
  img.dataset.categoria = data.categoria;
  img.alt = data.alt;
  return img;
}

function cargarSiguienteObjeto() {
  if (indiceActual < objetosData.length) {
    contenedorObjetos.innerHTML = "";
    objetoActual = crearObjeto(objetosData[indiceActual]);
    contenedorObjetos.appendChild(objetoActual);
    
    objetoActual.addEventListener("dragstart", e => {
      e.dataTransfer.setData("categoria", objetoActual.dataset.categoria);
    });
  } else {
    setTimeout(() => {
      alert(`¡Juego terminado! Puntaje final: ${puntaje}`);
      reiniciarJuego();
    }, 100);
  }
}

function reiniciarJuego() {
  puntaje = 0;
  indiceActual = 0;
  puntajeEl.textContent = `Puntaje: ${puntaje}`;
  contenedorObjetos.innerHTML = "";
  cargarSiguienteObjeto();
}

canecas.forEach(caneca => {
  caneca.addEventListener("dragover", e => {
    e.preventDefault();
  });

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    
    if (!objetoActual) return;
    
    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaCaneca = caneca.dataset.categoria;
    
    if (categoriaObjeto === categoriaCaneca) {
      puntaje += 8;
      puntajeEl.textContent = `Puntaje: ${puntaje}`;
      contenedorObjetos.innerHTML = "";
      indiceActual++;
      cargarSiguienteObjeto();
    } else {
      puntaje -= 8;
      puntajeEl.textContent = `Puntaje: ${puntaje}`;
    }
  });
});

// Iniciar juego
cargarSiguienteObjeto();
