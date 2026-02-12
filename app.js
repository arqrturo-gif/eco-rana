// Estado del juego
let score = 0;
let yaClasificado = false;
const categoriaCorrecta = "reciclable";

// Referencias DOM
const objeto = document.getElementById("objeto");
const contenedores = document.querySelectorAll(".contenedor");
const scoreEl = document.getElementById("score");

// Drag
objeto.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "objeto");
});

// Drop
contenedores.forEach(contenedor => {

  contenedor.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  contenedor.addEventListener("drop", (e) => {
    e.preventDefault();

    if (yaClasificado) return;

    const categoriaDrop = contenedor.dataset.categoria;

    if (categoriaDrop === categoriaCorrecta) {
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
