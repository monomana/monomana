// $("#btn").click(function() {
// 	$('.shrinker').removeClass('timelapse');
// 	setTimeout(function() {
// 		$('.shrinker').addClass('timelapse');
// 	}, 500)
// })

/* progress bar gradient */
/* document.querySelector("#btn")
.addEventListener("click",event => {
    const p= document.querySelector(".shrinker")
    p.classList.remove("timelapse");
    setTimeout(function() {
        p.classList.add('timelapse');
    }, 500)
}) */

const html = document.querySelector("html");

const btnTheme = document.querySelector(".theme-buttons");
const btnLight = document.querySelector("#btn-theme-light");
const btnDark = document.querySelector("#btn-theme-dark");
const enableLight = () => {
    if (btnLight.classList.contains("bx-sun")) {
        btnLight.classList.replace("bx-sun", "bxs-sun");
        btnDark.classList.replace("bxs-moon", "bx-moon");
        html.classList.toggle("dark");
        localStorage.setItem("theme", "light");

        btnLight.classList.toggle("tm-btn-active");
        btnDark.classList.toggle("tm-btn-active");
    }
};
const enableDark = () => {
    if (btnDark.classList.contains("bx-moon")) {
        btnDark.classList.replace("bx-moon", "bxs-moon");
        btnLight.classList.replace("bxs-sun", "bx-sun");
        html.classList.toggle("dark");
        localStorage.setItem("theme", "dark");

        btnLight.classList.toggle("tm-btn-active");
        btnDark.classList.toggle("tm-btn-active");
    }
};

let theme = localStorage.getItem("theme");
if (theme === "dark") {
    enableDark();
} else if (theme === "light") {
    enableLight();
}

btnLight.addEventListener("click", () => enableLight());
btnDark.addEventListener("click", () => enableDark());

const btnMenu = document.querySelector("#btn-menu");
const navBar = document.querySelector(".navbar");
const headerNav = document.querySelector(".header");
const openMenu = () => {
    if (btnMenu.classList.contains("bx-menu")) {
        navBar.style.display = "flex";
        headerNav.classList.add("box-shadow");
        // navBar.style.visibility='visible';
        btnMenu.classList.replace("bx-menu", "bx-x");
    } else {
        // navBar.style.visibility='hidden';
        const sec = document.querySelector("#home");
        if (isInViewport(sec)) {
            headerNav.classList.remove("box-shadow");
        }

        navBar.style.display = "none";
        btnMenu.classList.replace("bx-x", "bx-menu");
    }
    navBar.style.transition = ".7s";
};
btnMenu.addEventListener("click", () => openMenu());
window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
        navBar.style.display = "flex";
    } else {
        navBar.style.display = "none";
        btnMenu.classList.replace("bx-x", "bx-menu");
    }
});

// Menu active
const menuItems = document.querySelectorAll('[data-section="menu"]');
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        menuItems.forEach((item) => {
            if (item.classList.contains("active")) {
                item.classList.toggle("active");
            }
        });

        item.classList.toggle("active");
    });
});

/* ======== close menu on outher click =========== */
document.body.addEventListener("click", (e) => {
    if (!isInsideMySpecialWidget(e.target, "navbar") &&
    !isInsideMySpecialWidget(e.target, "btn-menu")) { 
             
        if (!btnMenu.classList.contains('bx-menu') ) {
            if (navBar.style.display === 'flex') {
                navBar.style.display = "none";
                btnMenu.classList.replace("bx-x", "bx-menu");    
            }
        }
    }
    // console.log(window.innerWidth);
    // if (
    //     !isInsideMySpecialWidget(e.target, "menu") &&
    //     !isInsideMySpecialWidget(e.target, "btn-menu") &&
    //     window.innerWidth < 800) {
    //     menu.classList.remove("show");
    //     menu.classList.add("hidden");
    //     btnMenuImg.setAttribute("src", "../assets/icons/btn-menu.png");
    // }
});

function isInsideMySpecialWidget(elem, mySpecialWidgetId) {
    while (elem.parentElement) {
        
        if (elem.id === mySpecialWidgetId) {
            return true;
        }
        elem = elem.parentElement;
    }
    return false;
}

/* ============== LANGUAGE FEATURE =================== */

const flagsContainer = document.querySelector("#flags");
const flagElement = document.querySelectorAll(".flag-item");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`assets/lang/${language}.json`);
    const jsonTexts = await requestJson.json();

    for (const text of textsToChange) {
        const section = text.dataset.section;
        const value = text.dataset.value;
        text.innerHTML = jsonTexts[section][value];
        // console.log(jsonTexts[section][value]);
    }
};
function changeFlag(flagitem) {
    if (!flagitem.classList.contains("active")) {
        flagElement.forEach((element) => {
            element.classList.toggle("active");
        });
        localStorage.setItem("lang", flagitem.dataset.language);
        changeLanguage(flagitem.dataset.language);
    }
}

/*
Resource
 autor: https://es.stackoverflow.com/users/97355/fran-islas
 link: https://es.stackoverflow.com/a/216837
 */

let lang = localStorage.getItem("lang");
const locale = navigator.language;
// console.log(`lang ${lang}`);
// console.log(`lang ${navigator.language}`);
if (!lang) {
    lang = "en";
    if (locale.includes("es-")) {
        lang = "es";
    }
}

changeLanguage(lang);
const flag = document.querySelector(`[data-language="${lang}"]`);
changeFlag(flag);

flagElement.forEach((flagitem) => {
    flagitem.addEventListener("click", () => changeFlag(flagitem));
});

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
}

/*
Resource
 autor: https://stackoverflow.com/users/12079462/garbus-uchiha
 link: https://stackoverflow.com/a/59582473
 */
// let scroolSection ;

window.onscroll = () => {
    // finding element in the viewport
    for (el of document.querySelectorAll("section")) {
        // console.log(el);
        if (isInViewport(el)) {
            // setting active element
            // scroolSection = el;
            const header = document.querySelector(".header");

            if (el.id !== "home") {
                header.classList.add("box-shadow");
                // header.style.background= 'var(--bg-image)';
                // console.log(el.id);
            } else {
                // console.log(el.id);
                header.classList.remove("box-shadow");
                // header.style.background= 'none';
            }

            const selectedMenu = document.querySelector(`[data-value="${el.id}"]`);

            if (!selectedMenu.classList.contains("active")) {
                for (el of document.querySelectorAll('[data-section="menu"]')) {
                    el.classList.remove("active"); // reset list
                }

                selectedMenu.classList.toggle("active");
            } else {
            }
        }
    }
};

/* Carousel */
const carouselImage = document.querySelector("#carousel-img");
const buttons = document.querySelectorAll('.btn-carousel');
// let indexImg = 2;
// setInterval(() => {
//     indexImg = indexImg === 1 ? 2 : 1;    
//     carouselImage.setAttribute("src", `assets/img/bg-home-${indexImg}.jpeg`);
//     buttons.forEach(child => child.classList.toggle('btn-carousel-active'));
// }, 5000);

document.querySelectorAll(".btn-carousel").forEach((btn) => {
    btn.addEventListener("click", () => {
        
       
       
        buttons.forEach(child => child.classList.toggle('btn-carousel-active'));
    //    btn.classList.toggle('btn-carousel-active');
        if (btn.id === "first-img") {
            carouselImage.setAttribute("src", "assets/img/bg-home-oldie-1.jpg");

        } else {
            carouselImage.setAttribute("src", "assets/img/bg-home-oldie-2.jpg");
        }
    });
});

// window.addEventListener("scrollend", (event) => {
//   // scroll ended
//   const header = document.querySelector('.header');
//       header.classList.remove('box-shadow');
// });
