let puntaje = 0;
let indiceActual = 0;
let objetoActual = null;

const objetosData = [
  { src: "img/serv.png", categoria: "no-aprovechable", alt: "servilleta", top: "55%", left: "5%" },
  { src: "img/cp.png", categoria: "organico", alt: "cáscara de plátano", top: "30%", left: "18%" },
  { src: "img/btlv.png", categoria: "reciclable", alt: "botella gaseosa", top: "65%", left: "28%" },
  { src: "img/jeringa.png", categoria: "no-aprovechable", alt: "jeringa", top: "45%", left: "45%" },
  { src: "img/vaso.png", categoria: "reciclable", alt: "vaso cartón", top: "75%", left: "60%" },
  { src: "img/btlv.png", categoria: "reciclable", alt: "botella plástico", top: "20%", left: "75%" },
  { src: "img/ph.png", categoria: "no-aprovechable", alt: "papel higiénico", top: "80%", left: "85%" }
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
  img.style.top = data.top;
  img.style.left = data.left;
  return img;
}

function cargarSiguienteObjeto() {
  if (indiceActual < objetosData.length) {
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
  caneca.addEventListener("dragover", e => e.preventDefault());

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    
    if (!objetoActual) return;
    
    const categoriaObjeto = objetoActual.dataset.categoria;
    const categoriaCaneca = caneca.dataset.categoria;
    
    if (categoriaObjeto === categoriaCaneca) {
      puntaje += 8;
      puntajeEl.textContent = `Puntaje: ${puntaje}`;
      objetoActual.remove();
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
