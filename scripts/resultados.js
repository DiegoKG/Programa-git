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

