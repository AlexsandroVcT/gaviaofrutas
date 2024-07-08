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

$("#btnOpenMenu").click(function () {
  $("#linksMenu").css("display", "flex");
  $("#btnOpenMenu").css("display", "none");
  $("#btnCloseMenu").css("display", "flex");
  $(".iconProfile").css("display", "none");
});

$("#btnCloseMenu").click(function () {
  $("#linksMenu").css("display", "none");
  $("#btnOpenMenu").css("display", "flex");
  $("#btnCloseMenu").css("display", "none");
  $(".iconProfile").css("display", "flex");
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
