function buscarProductos() {
  const query = document.getElementById('busqueda').value.trim();

  if (query === "") {
      document.getElementById('resultados').innerHTML = "<p>Por favor, ingrese un término de búsqueda.</p>";
      return;
  }

  fetch(`http://localhost:3001/buscar?query=${query}`)
      .then(response => response.json())
      .then(data => {
          let html = '<h3>Resultados:</h3>';
          if (data.length === 0) {
              html += '<p>No se encontraron productos</p>';
          } else {
              data.forEach(producto => {
                  html += `
                    <div class="producto">
                      <h4>${producto.nombre}</h4>
                      <p>Talla: ${producto.talla}</p>
                      <p>${producto.descripcion}</p>
                      <p>Condición: ${producto.condicion}</p>
                      <p>Precio: $${producto.precio}</p>
                      <hr>
                    </div>
                  `;
              });
          }
          document.getElementById('resultados').innerHTML = html;
      })
      .catch(error => console.error('❌ Error en la búsqueda:', error));
}

// Hacer que la función sea accesible desde el HTML
window.buscarProductos = buscarProductos;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.search-button').addEventListener('click', () => {
        const query = document.getElementById('busqueda').value.trim();
        if (query !== "") {
            window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
        }
    });

    document.getElementById('busqueda').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const query = document.getElementById('busqueda').value.trim();
            if (query !== "") {
                window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
            }
        }
    });
});
