document.querySelectorAll(".color-btn").forEach(button => {
  button.addEventListener("click", function () {
      document.querySelectorAll(".color-btn").forEach(btn => btn.classList.remove("selected"));
      this.classList.add("selected");
      document.getElementById("color").value = this.getAttribute("data-color");
  });
});

// color personalizado
document.getElementById("custom-color").addEventListener("input", function () {
  document.querySelectorAll(".color-btn").forEach(btn => btn.classList.remove("selected"));
  document.getElementById("color").value = this.value;
});

document.getElementById("subir-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  try {
      const response = await fetch("http://localhost:3001/subir-producto", {
          method: "POST",
          body: formData
      });

      const result = await response.json();
      console.log("✅ Respuesta del servidor:", result);
  } catch (error) {
      console.error("❌ Error en la solicitud:", error);
  }
});

