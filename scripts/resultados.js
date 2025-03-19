const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0)
})

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
        dropdown.style.display = "block";
    }
}
function selectColor(element) {
    var circles = document.getElementsByClassName('color-circle');
    for (var i = 0; i < circles.length; i++) {
        circles[i].classList.remove('selected');
    }
    element.classList.add('selected');
}

function toggleFilterBar() {
    var filterbar = document.getElementById('filterbar');
    if (filterbar.style.display === "flex") {
        filterbar.style.display = "none";
    } else {
        filterbar.style.display = "flex";
    }
}

window.addEventListener('resize', function() {
    var filterbar = document.getElementById('filterbar');
    if (window.innerWidth > 768) {
        filterbar.style.display = "flex";
    } else {
        filterbar.style.display = "none";
    }
});


let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (!query) {
        document.getElementById("query-text").textContent = "No ingresaste ningún término de búsqueda.";
        return;
    }

    document.getElementById("query-text").textContent = query;

    try {
        const response = await fetch(`http://localhost:3001/buscar?query=${query}`);
        const productos = await response.json();

        const contenedor = document.getElementById("lista-productos");
        contenedor.innerHTML = ''; 
        if (productos.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron productos</p>';
        } else {
            productos.forEach(producto => {            
                const imagenUrl = producto.imagenes
                    ? `http://localhost:3001/uploads/${producto.imagenes}`
                    : "images/default-image.jpg";
            
                const productoHTML = `
                    <div class="row">
                        <img src="${producto.imagenes}" alt="${producto.nombre}">
                        <div class="heart-icon">
                            <i class='bx bx-heart'></i>
                        </div>
                        <div class="price">
                            <h4>${producto.nombre}</h4>
                            <p>$${producto.precio}</p>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += productoHTML;
            });
        }
    } catch (error) {
        console.error("❌ Error en la búsqueda:", error);
        document.getElementById("lista-productos").innerHTML = '<p>Ocurrió un error al cargar los productos.</p>';
    }
});
