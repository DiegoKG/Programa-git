document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reset-form");
  const responseMessage = document.getElementById("response-message");

  form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita que la página se recargue

      const email = document.getElementById("email").value;

      if (!email) {
          responseMessage.textContent = "Por favor, ingresa un correo válido.";
          responseMessage.classList.remove("hidden");
          return;
      }

      try {
          const response = await fetch("http://localhost:3001/recuperar", { 
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email })
          });

          const data = await response.json();

          if (response.ok) {
              responseMessage.textContent = data.message; // Mensaje del backend
              responseMessage.classList.remove("hidden");
              responseMessage.style.color = "green";
          } else {
              responseMessage.textContent = data.error; // Error del backend
              responseMessage.classList.remove("hidden");
              responseMessage.style.color = "red";
          }
      } catch (error) {
          console.error("Error en la solicitud:", error);
          responseMessage.textContent = "Hubo un problema, intenta de nuevo.";
          responseMessage.classList.remove("hidden");
          responseMessage.style.color = "red";
      }
  });
});
