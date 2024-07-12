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

  const usernameInput = signUpForm.querySelector("#signupUsername");
  const emailInput = signUpForm.querySelector("#signupEmail");
  const passwordInput = signUpForm.querySelector("#signupPassword");
  const telInput = signUpForm.querySelector("#signupTel");
  const bairroInput = signUpForm.querySelector("#signupBairro");


  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const tel = telInput.value;
  const bairro = bairroInput.value;


  // Validar o nome de usuário
  if (!username || username.trim().length < 3) {
    showError("O nome de usuário deve ter pelo menos 3 caracteres.");
    return;
  }

  // Validar o e-mail
  if (!email || !validateEmail(email)) {
    showError("O e-mail fornecido não é válido.");
    return;
  }

  // Validar a senha
  if (!password || password.trim().length < 6) {
    showError("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  try {
    const response = await fetch("https://gaviao-frutas.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ username, email, password, tel, bairro }),
    });

    if (!response.ok) {
      const errorMessage = await response.json(); // Obter mensagem de erro do corpo da resposta
      throw new Error(
        errorMessage.message || "Erro ao enviar dados para o servidor."
      );
    }
    if (response.body.errors) { 
      throw new Error(
        response.body.message || "Erro ao enviar dados para o servidor."
      );
    }

    signUpForm.reset();
    Swal.fire({
      title: "Cadastro realizado com sucesso!",
      icon: "success",
      position: "top-end", // Posição no canto superior direito
      showConfirmButton: false, // Não mostrar botão de confirmação
      timer: 2000, // Exibir por 2 segundos
      toast: true, // Configurar como notificação toast
      width: "20rem", // Largura da notificação
      padding: "0.5rem", // Padding interno
      customClass: {
        popup: "custom-popup", // Adiciona uma classe personalizada ao contêiner da notificação
        title: "custom-title", // Adiciona uma classe personalizada ao título
        icon: "custom-icon", // Adiciona uma classe personalizada ao ícone
      },
    }).then(() => {
      // Redirecionar para a página de login após o cadastro bem-sucedido
      window.location.href = "./login.html";
    });
  } catch (error) {
    console.error("Erro:", error.message);
    Swal.fire({
      title: error.message,
      icon: "error",
      position: "top-end", // Posição no canto superior direito
      toast: true, // Configurar como notificação toast
      timer: 3000, // Exibir por 2 segundos
      showConfirmButton: false, // Não mostrar botão de confirmação
      width: "20rem", // Largura da notificação
      padding: "0.5rem", // Padding interno
      customClass: {
        popup: "custom-popup", // Adiciona uma classe personalizada ao contêiner da notificação
        title: "custom-title", // Adiciona uma classe personalizada ao título
        icon: "custom-icon", // Adiciona uma classe personalizada ao ícone
      },
    });
  }
});

// Função para exibir mensagens de erro
function showError(errorMessage) {
  Swal.fire({
    title: errorMessage,
    icon: "error",
    position: "top-end", // Posição no canto superior direito
    toast: true, // Configurar como notificação toast
    timer: 3000, // Exibir por 2 segundos
    showConfirmButton: false, // Não mostrar botão de confirmação
    width: "20rem", // Largura da notificação
    padding: "0.5rem", // Padding interno
    customClass: {
      popup: "custom-popup", // Adiciona uma classe personalizada ao contêiner da notificação
      title: "custom-title", // Adiciona uma classe personalizada ao título
      icon: "custom-icon", // Adiciona uma classe personalizada ao ícone
    },
  });
}

// Função para validar o formato do e-mail
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length >= 6 && emailRegex.test(email);
}

// Manipulador de evento para o formulário de login
const loginForm = document.querySelector(".sign-in-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita o envio do formulário

  const usernameInput = loginForm.querySelector("#loginUsername");
  const passwordInput = loginForm.querySelector("#loginPassword");

  const email = usernameInput.value;
  const password = passwordInput.value;

  if (!email || !validateEmail(email)) {
    showError("O e-mail fornecido não é válido.");
    return;
  }

  // Validar a senha
  if (!password || password.trim().length < 6) {
    showError("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  try {
    const response = await fetch("https://gaviao-frutas.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.json(); // Obter mensagem de erro do corpo da resposta
      throw new Error(
        errorMessage.message || "Erro ao enviar dados para o servidor."
      );
    }
    if (response.body.errors) { 
      throw new Error(
        response.body.message || "Erro ao enviar dados para o servidor."
      );
    }
    const data = await response.json();
    const user = data.user;

    // Armazenar o token no localStorage
    localStorage.setItem("userData", JSON.stringify(user));

    // Exibir notificação de login bem-sucedido
    Swal.fire({
      title: `Login efetuado! Bem-vindo ${user.username}`,
      icon: "success",
      position: "top-end", // Posição no canto superior direito
      showConfirmButton: false, // Não mostrar botão de confirmação
      timer: 2000, // Exibir por 2 segundos
      toast: true, // Configurar como notificação toast
      width: "20rem", // Largura da notificação
      padding: "0.5rem", // Padding interno
      customClass: {
        popup: "custom-popup", // Adiciona uma classe personalizada ao contêiner da notificação
        title: "custom-title", // Adiciona uma classe personalizada ao título
        icon: "custom-icon", // Adiciona uma classe personalizada ao ícone
      },
    });

    // Aguardar 2 segundos antes de redirecionar para a página principal
    setTimeout(() => {
      window.location.href='../../index.html'
    }, 2000);
  } catch (error) {
    console.error("Erro:", error.message);
    Swal.fire({
      title: error.message,
      icon: "error",
      position: "top-end", // Posição no canto superior direito
      timer: 3000, // Exibir por 3 segundos
      showConfirmButton: false, // Não mostrar botão de confirmação
      toast: true, // Configurar como notificação toast
      width: "20rem", // Largura da notificação
      padding: "0.5rem", // Padding interno
      customClass: {
        popup: "custom-popup", // Adiciona uma classe personalizada ao contêiner da notificação
        title: "custom-title", // Adiciona uma classe personalizada ao título
        icon: "custom-icon", // Adiciona uma classe personalizada ao ícone
      },
    });
  }
});

$(".sign-in-form").css("z-index", 2);
$(".sign-in-form").css("display", "flex");
$(".sign-up-form").css("display", "none");
$(".left-panel").css("display", "none");

$("#sign-up-btn").click(function () {
  $(".sign-in-form").css("display", "none");
  $(".sign-up-form").css("display", "flex");
  $(".left-panel").css("display", "flex");
  $(".right-panel").css("display", "none");
  $(".sign-up-form").css("z-index", 1);
});

$("#sign-in-btn").click(function () {
  $(".sign-in-form").css("display", "flex");
  $(".sign-up-form").css("display", "none");
  $(".left-panel").css("display", "none");
  $(".right-panel").css("display", "flex");
  $(".sign-up-form").css("z-index", 1);
});