// ================================
// DEFINICIÓN DE OBJETOS DEL JUEGO
// ================================
const objetosJuego = [
  {
    id: "obj3",
    nombre: "Botella de gaseosa",
    categoria: "reciclable",
    imagen: "img/botella.png"
  }
];

// ================================
// ESTADO DEL JUEGO
// ================================
let score = 0;
let yaClasificado = false;

// ================================
// REFERENCIAS DOM
// ================================
const scoreEl = document.getElementById("score");
const zonaObjeto = document.getElementById("zona-objeto");
const contenedores = document.querySelectorAll(".contenedor");

// ================================
// CREAR OBJETO VISUAL
// ================================
const objetoActivo = objetosJuego[0];

const img = document.createElement("img");
img.id = objetoActivo.id;
img.src = objetoActivo.imagen;
img.alt = objetoActivo.nombre;
img.draggable = true;
img.dataset.categoria = objetoActivo.categoria;

zonaObjeto.appendChild(img);

// ================================
// DRAG
// ================================
img.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("categoria", img.dataset.categoria);
});

// ================================
// DROP
// ================================
contenedores.forEach(contenedor => {

  contenedor.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  contenedor.addEventListener("drop", (e) => {
    e.preventDefault();

    if (yaClasificado) return;

    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaContenedor = contenedor.dataset.categoria;

    if (categoriaObjeto === categoriaContenedor) {
      score += 8;
      alert("Muy bien!!!");
    } else {
      score -= 8;
      alert("Error");
    }

    scoreEl.textContent = `Puntaje: ${score}`;
    yaClasificado = true;
  });
});
