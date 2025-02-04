document.getElementById("register-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita el envío normal del formulario

  // Capturar los valores del formulario
  const nombre = document.querySelector("[name='nombre']").value;
  const email = document.querySelector("[name='email']").value;
  const contraseña = document.querySelector("[name='contraseña']").value;
  const confirmarContraseña = document.getElementById("confirmarContraseña").value;
  const direccion = document.querySelector("[name='direccion']").value;
  const telefono = document.querySelector("[name='telefono']").value;

  // Validar que las contraseñas coincidan
  if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
  }

  // Crear el objeto con los datos
  const userData = {
      nombre,
      email,
      contraseña,
      direccion,
      telefono
  };

  try {
      const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
          alert("Usuario registrado con éxito.");
          document.getElementById("register-form").reset(); // Limpiar el formulario
      } else {
          alert("Error: " + result.error);
      }
  } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al registrar usuario.");
  }
});