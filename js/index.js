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
const navBarFooter = document.querySelector(".navbar-footer");
const openMenu = () => {
    if (btnMenu.classList.contains("bx-menu")) {
        navBar.style.display = "flex";
        // navBar.style.visibility='visible';
        btnMenu.classList.replace("bx-menu", "bx-x");
    } else {
        // navBar.style.visibility='hidden';
        navBar.style.display = "none";
        btnMenu.classList.replace("bx-x", "bx-menu");
    }
    navBar.style.transition = ".7s";
};
btnMenu.addEventListener("click", () => openMenu());
window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
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

let lang = localStorage.getItem("lang");
if (!lang) {
    lang = "es";
}
changeLanguage(lang);

flagElement.forEach((flagitem) => {
    flagitem.addEventListener("click", () => {
        if (!flagitem.classList.contains("active")) {
            flagElement.forEach((element) => {
                element.classList.toggle("active");
            });
            localStorage.setItem("lang", flagitem.dataset.language);
            changeLanguage(flagitem.dataset.language);
        }
    });
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

window.onscroll = () => {
    // finding element in the viewport
    for (el of document.querySelectorAll("section")) {
        // console.log(el);
        if (isInViewport(el)) {
            // setting active element
            const selectedMenu = document.querySelector(`[data-value="${el.id}"]`);
            if (!selectedMenu.classList.contains("active")) {
                for (el of document.querySelectorAll('[data-section="menu"]')) {
                    el.classList.remove("active"); // reset list
                }
                console.log(selectedMenu);
                selectedMenu.classList.toggle("active");
            } else {
            }
        }
    }
};
