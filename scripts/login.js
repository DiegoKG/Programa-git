document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que el formulario recargue la página

        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, contraseña })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById("loginMessage").innerText = "Inicio de sesión exitoso";
                document.getElementById("loginMessage").style.color = "green";
                window.location.href = "general.html"; // Redirigir a la página principal


                // Guardar la sesión en localStorage (opcional)
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                // Redirigir a otra página si es necesario
                // window.location.href = "dashboard.html";
            } else {
                document.getElementById("loginMessage").innerText = data.error;
                document.getElementById("loginMessage").style.color = "red";
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            document.getElementById("loginMessage").innerText = "Error en la conexión";
            document.getElementById("loginMessage").style.color = "red";
        }
    });
});
