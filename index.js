let backToTopBtn = document.querySelector(".back-to-top");

window.onscroll = () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
};
// Funcionalidade que faz parte para mostrar o username logado na página
function updateUsernameOrRedirect() {
  try {
    const user = getUserLogged();
    const usernameElement = document.getElementById("username");
    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("loginButton");
    const loginLink = document.getElementById("loginLink");
    const userBadgeText = document.querySelector(".buttonConfigUser p");
    const userButton = document.querySelector(".buttonConfigUser");

    if (!usernameElement || !logoutButton || !loginButton) {
      return;
    }

    if (user) {
      usernameElement.innerText = user.username;
      logoutButton.style.display = "inline-block";
      loginButton.style.display = "none";
      if (userBadgeText) {
        userBadgeText.innerText = (user.username || "U").trim().charAt(0).toUpperCase();
      }
      if (userButton) {
        userButton.setAttribute("title", `Conta de ${user.username}`);
      }
      document.body.classList.add("logged-in");
      document.body.classList.remove("guest-user");
      if (loginLink) {
        loginLink.style.display = "none";
      }
    } else {
      usernameElement.innerText = "Visitante";
      logoutButton.style.display = "none";
      loginButton.style.display = "inline-block";
      if (userBadgeText) {
        userBadgeText.innerText = "V";
      }
      if (userButton) {
        userButton.setAttribute("title", "Entrar ou criar cadastro");
      }
      document.body.classList.add("guest-user");
      document.body.classList.remove("logged-in");
      if (loginLink) {
        loginLink.style.display = "inline-block";
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar nome de usuário ou redirecionar:", error);
  }
}

// Função para redirecionar para a página de login
function login() {
  window.location.href = "/pages/login.html";
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", updateUsernameOrRedirect);

let menuItems = document.getElementsByClassName("menu-item");

Array.from(menuItems).forEach((item, index) => {
  item.onclick = (e) => {
    let currMenu = document.querySelector(".menu-item.active");
    currMenu.classList.remove("active");
    item.classList.add("active");
  };
});

$(document).ready(function () {
  const $foodMenuList = $(".food-item-wrap");
  const $categories = $(".food-category button");

  $categories.on("click", function () {
    $categories.removeClass("active");
    $(this).addClass("active");

    const selectedCategory = $(this).data("food-type");

    if (selectedCategory === "all") {
      $foodMenuList.find(".food-item").show();
    } else {
      $foodMenuList.find(".food-item").hide();
      $foodMenuList.find("." + selectedCategory).show();
    }
  });
});

let scroll = window.requestAnimationFrame || function (callback) {};

let elToShow = document.querySelectorAll(".play-on-scroll");

isElInViewPort = (el) => {
  let rect = el.getBoundingClientRect();

  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
};

loop = () => {
  elToShow.forEach((item, index) => {
    if (isElInViewPort(item)) {
      item.classList.add("start");
    } else {
      item.classList.remove("start");
    }
  });

  scroll(loop);
};

loop();

let bottomNavItems = document.querySelectorAll(".mb-nav-item");

let bottomMove = document.querySelector(".mb-move-item");

bottomNavItems.forEach((item, index) => {
  item.onclick = (e) => {
    console.log("object");
    let crrItem = document.querySelector(".mb-nav-item.active");
    crrItem.classList.remove("active");
    item.classList.add("active");
    bottomMove.style.left = index * 25 + "%";
  };
});

$(window).scroll(function () {
  var height = $(window).scrollTop();
  var header = document.querySelector("header");

  if (height > 0) {
    header.classList.add("menu-scroll");
  } else {
    header.classList.remove("menu-scroll");
  }
});

$(document).ready(function () {
  const MOBILE_BREAKPOINT = 820;

  $("#btnOpenMenu").click(function () {
    $("#linksMenu").css("display", "flex");
    $("#btnOpenMenu").hide();
    $("#btnCloseMenu").show();
  });

  $("#btnCloseMenu, #linksMenu a").click(function () {
    if ($(window).width() <= MOBILE_BREAKPOINT) {
      $("#linksMenu").hide();
      $("#btnOpenMenu").show();
      $("#btnCloseMenu").hide();
    }
  });

  $("#linksMenu a").click(function () {
    // Remove 'linkAtive' class from all links
    $("#linksMenu a").removeClass("linkActive");
    // Add 'linkAtive' class to the clicked link
    $(this).addClass("linkActive");
  });

  $(window)
    .resize(function () {
      if ($(window).width() > MOBILE_BREAKPOINT) {
        $("#linksMenu").css("display", "flex");
        $("#btnOpenMenu, #btnCloseMenu").hide();
      } else {
        $("#linksMenu").hide();
        $("#btnOpenMenu").show();
        $("#btnCloseMenu").hide();
      }
    })
    .resize();
});

var swiper1 = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

var swiper2 = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination-beverages",
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    360: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

// LOGIN OPEN CONFIG USER
$(document).ready(function () {
  let isMouseOverButton = false;
  const ACCOUNT_MENU_BREAKPOINT = 958;

  $(".buttonConfigUser")
    .mouseover(function () {
      if ($(window).width() <= ACCOUNT_MENU_BREAKPOINT) {
        $(".buttons").hide();
        return;
      }
      isMouseOverButton = true;
      $(".buttons").show();
    })
    .mouseout(function () {
      if ($(window).width() <= ACCOUNT_MENU_BREAKPOINT) {
        $(".buttons").hide();
        return;
      }
      isMouseOverButton = false;
    });

  $(document).click(function (event) {
    if ($(window).width() <= ACCOUNT_MENU_BREAKPOINT) {
      $(".buttons").hide();
      return;
    }
    // Verifica se o clique foi fora do elemento .buttons e do botão .buttonConfigUser
    if (!$(event.target).closest(".buttons, .buttonConfigUser").length) {
      $(".buttons").hide();
    } else if (isMouseOverButton) {
      $(".buttons").show();
    }
  });

  $(window).scroll(function () {
    $(".buttons").hide();
  });

  $(".buttonConfigUser").on("click", function () {
    const user = getUserLogged();
    if (!user) {
      login();
      return;
    }
    if ($(window).width() <= ACCOUNT_MENU_BREAKPOINT) {
      return;
    }
    $(".buttons").toggle();
  });
});

function copyStoreAddress() {
  const address = "Rua São Pedro, Santa Luzia do Norte - AL, 57130-000";

  const onSuccess = () => {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Endereço copiado!",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    alert("Endereço copiado!");
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(address)
      .then(onSuccess)
      .catch(() => alert(`Copie manualmente: ${address}`));
    return;
  }

  const input = document.createElement("input");
  input.value = address;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  onSuccess();
}
