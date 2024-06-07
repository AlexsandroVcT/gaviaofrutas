const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Manipulador de evento para o formulário de inscrição
const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const username = signUpForm.querySelector("#signupUsername").value;
    const email = signUpForm.querySelector("#signupEmail").value;
    const password = signUpForm.querySelector("#signupPassword").value;

    try {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.json(); // Obter mensagem de erro do corpo da resposta
            throw new Error(errorMessage.message || "Erro ao enviar dados para o servidor.");
        }

        signUpForm.reset();
        Swal.fire({
            title: "Sucesso!",
            text: "Cadastro realizado com sucesso!",
            icon: "success",
            customClass: {
              confirmButton: 'green-button' // Adiciona a classe 'green-button' ao botão de confirmação
            }
        }).then(() => {
            // Redirecionar para a página de login após o cadastro bem-sucedido
            window.location.href = "./login.html";
        });
    } catch (error) {
        console.error("Erro:", error.message);
        Swal.fire({
            title: "Erro!",
            text: error.message,
            icon: "error",
            customClass: {
              confirmButton: 'red-button' // Adiciona a classe 'red-button' ao botão de confirmação
            }
        });
    }
});

// Manipulador de evento para o formulário de login
const loginForm = document.querySelector(".sign-in-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const username = document.querySelector("#loginUsername").value;
    const password = document.querySelector("#loginPassword").value;

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.json(); // Obter mensagem de erro do corpo da resposta
            throw new Error(errorMessage.message || "Erro ao enviar dados para o servidor.");
        }

        // Exibir notificação de login bem-sucedido
        Swal.fire({
            title: "Login efetuado!",
            icon: "success",
            position: "top-end", // Posição no canto superior direito
            showConfirmButton: false, // Não mostrar botão de confirmação
            timer: 2000, // Exibir por 2 segundos
            toast: true, // Configurar como notificação toast
            width: "20rem", // Largura da notificação
            padding: "0.5rem", // Padding interno
            customClass: {
              popup: 'custom-popup', // Adiciona uma classe personalizada ao contêiner da notificação
              title: 'custom-title', // Adiciona uma classe personalizada ao título
              icon: 'custom-icon' // Adiciona uma classe personalizada ao ícone
            }
        });

        // Aguardar 2 segundos antes de redirecionar para a página principal
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
    } catch (error) {
        console.error("Erro:", error.message);
        Swal.fire({
            title: "Erro!",
            text: error.message,
            icon: "error",
            customClass: {
              confirmButton: 'red-button' // Adiciona a classe 'red-button' ao botão de confirmação
            }
        });
    }
});
