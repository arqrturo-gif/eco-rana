let yaClasificado = false;

const objeto = document.getElementById("objeto");
const canecas = document.querySelectorAll(".caneca");

objeto.addEventListener("dragstart", e => {
  e.dataTransfer.setData("categoria", objeto.dataset.categoria);
});

canecas.forEach(caneca => {

  caneca.addEventListener("dragover", e => {
    e.preventDefault();
  });

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    if (yaClasificado) return;

    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaCaneca = caneca.dataset.categoria;

    if (categoriaObjeto === categoriaCaneca) {
      alert("Muy bien!!!");
    } else {
      alert("Error");
    }

    yaClasificado = true;
  });
});
