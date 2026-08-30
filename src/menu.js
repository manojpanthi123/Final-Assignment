(function () {
    const btn = document.querySelector("header > .menu-toggle");
    const headerNav = document.querySelector("header nav");
    if (!btn || !headerNav) {
        return;
    }

    const backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    backdrop.hidden = true;

    const panel = document.createElement("div");
    panel.className = "side-menu";
    panel.innerHTML =
        '<button class="menu-toggle" type="button" aria-label="Close menu">' +
            "<span></span><span></span><span></span>" +
        "</button>" +
        "<nav>" + headerNav.innerHTML + "</nav>";

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    function pinMenu(open) {
        panel.style.setProperty("position", "fixed", "important");
        panel.style.setProperty("top", "0", "important");
        panel.style.setProperty("right", "0", "important");
        panel.style.setProperty("left", "auto", "important");
        panel.style.setProperty("bottom", "0", "important");
        panel.style.setProperty(
            "transform",
            open ? "translateX(0)" : "translateX(100%)",
            "important"
        );
    }

    pinMenu(false);

    function openMenu() {
        panel.classList.add("open");
        pinMenu(true);
        backdrop.hidden = false;
        document.body.classList.add("menu-open");
        document.body.style.overflow = "hidden";
        btn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        panel.classList.remove("open");
        pinMenu(false);
        backdrop.hidden = true;
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
        btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", openMenu);
    panel.querySelector(".menu-toggle").addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
})();
