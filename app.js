let puntaje = 0;
let vidas = 3;
let objetosClasificados = 0;
const totalObjetos = 7;

const objetos = document.querySelectorAll(".objeto");
const canecas = document.querySelectorAll(".caneca");
const puntajeEl = document.getElementById("puntaje");
const vidasEl = document.getElementById("vidas");

objetos.forEach(obj => {
  obj.addEventListener("dragstart", e => {
    e.dataTransfer.setData("categoria", obj.dataset.categoria);
  });
});

canecas.forEach(caneca => {
  caneca.addEventListener("dragover", e => e.preventDefault());

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    
    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaCaneca = caneca.dataset.categoria;
    const elementoArrastrado = document.querySelector(`.objeto:active`);
    
    if (categoriaObjeto === categoriaCaneca) {
      puntaje += 10;
      puntajeEl.textContent = `Puntaje: ${puntaje}`;
      
      if (elementoArrastrado) {
        elementoArrastrado.remove();
        objetosClasificados++;
      }
      
      if (objetosClasificados === totalObjetos) {
        setTimeout(() => {
          alert("¡Felicidades! Has clasificado todos los residuos 🎉");
        }, 100);
      }
    } else {
      vidas--;
      vidasEl.textContent = `Vidas: ${vidas}`;
      
      if (vidas === 0) {
        setTimeout(() => {
          alert("¡Game Over! Has perdido todas tus vidas 💀");
          location.reload();
        }, 100);
      }
    }
  });
});
