/* JavaScript demos */

function showDemo(number) {
    document.querySelectorAll(".demo").forEach(function (demo) {
        demo.classList.remove("active-demo");
    });

    document.querySelectorAll(".demo-button").forEach(function (button) {
        button.classList.remove("active");
    });

    document.getElementById("demo" + number).classList.add("active-demo");
    document.querySelectorAll(".demo-button")[number - 1].classList.add("active");

    if (number === 4) {
        refreshAuthView();
        window.setTimeout(initShopDashboard, 80);
    }
}

/* Demo 1: slideshow */

const slides = [
    {
        title: "HP Laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
        description: "Modern laptop suitable for students and office work."
    },
    {
        title: "Apple MacBook Air",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
        description: "Lightweight laptop with a modern and clean design."
    },
    {
        title: "Gaming Laptop",
        image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=700&q=80",
        description: "High-performance laptop suitable for gaming and applications."
    }
];

let currentSlide = 0;
let automaticSlide = 0;

function updateManualSlide() {
    document.getElementById("manualImage").src = slides[currentSlide].image;
    document.getElementById("manualTitle").innerText = slides[currentSlide].title;
    document.getElementById("manualDescription").innerText = slides[currentSlide].description;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateManualSlide();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateManualSlide();
}

function automaticSlideshow() {
    const autoImage = document.getElementById("autoImage");
    if (!autoImage) {
        return;
    }
    automaticSlide = (automaticSlide + 1) % slides.length;
    autoImage.src = slides[automaticSlide].image;
    document.getElementById("autoTitle").innerText = slides[automaticSlide].title;
    document.getElementById("autoDescription").innerText = slides[automaticSlide].description;
}

setInterval(automaticSlideshow, 3000);

const PAGE_STYLE_KEY = "demo1PageStyle";

function applyPageCustomisation(style) {
    const demo = document.getElementById("demo1");
    if (!demo || !style) {
        return;
    }
    demo.style.backgroundColor = style.background || "";
    demo.style.fontSize = style.fontSize || "";
    const illustration = document.getElementById("demoIllustration");
    if (illustration && style.illustration) {
        illustration.src = style.illustration;
    }
    const post = document.getElementById("longPostText");
    const moreBtn = document.getElementById("moreLessBtn");
    if (post && moreBtn) {
        const expanded = Boolean(style.moreOpen);
        post.classList.toggle("collapsed", !expanded);
        moreBtn.textContent = expanded ? "LESS" : "MORE";
    }
}

function savePageCustomisation() {
    const illustration = document.getElementById("pageIllustration");
    const post = document.getElementById("longPostText");
    const style = {
        background: document.getElementById("pageBgColor").value,
        fontSize: document.getElementById("pageTextSize").value,
        illustration: illustration ? illustration.value : "",
        moreOpen: post ? !post.classList.contains("collapsed") : false
    };
    localStorage.setItem(PAGE_STYLE_KEY, JSON.stringify(style));
    applyPageCustomisation(style);
}

(function initPageCustomisation() {
    const colorInput = document.getElementById("pageBgColor");
    const sizeInput = document.getElementById("pageTextSize");
    const illustrationInput = document.getElementById("pageIllustration");
    const moreBtn = document.getElementById("moreLessBtn");
    if (!colorInput || !sizeInput) {
        return;
    }
    let saved = null;
    try {
        saved = JSON.parse(localStorage.getItem(PAGE_STYLE_KEY) || "null");
    } catch (error) {
        saved = null;
    }
    if (saved) {
        if (saved.background) {
            colorInput.value = saved.background;
        }
        if (saved.fontSize) {
            sizeInput.value = saved.fontSize;
        }
        if (illustrationInput && saved.illustration) {
            illustrationInput.value = saved.illustration;
        }
        applyPageCustomisation(saved);
    }
    colorInput.addEventListener("input", savePageCustomisation);
    sizeInput.addEventListener("change", savePageCustomisation);
    if (illustrationInput) {
        illustrationInput.addEventListener("change", savePageCustomisation);
    }
    if (moreBtn) {
        moreBtn.addEventListener("click", function () {
            const post = document.getElementById("longPostText");
            if (!post) {
                return;
            }
            post.classList.toggle("collapsed");
            savePageCustomisation();
        });
    }
}());

/* Demo 2: comments, vote (one vote), favourites */

const comments = [
    { name: "Ian", text: "Recommended, good one" },
    { name: "Aman", text: "I don't like the color" },
    { name: "John", text: "Love it" }
];
let productVote = null;
let likeCount = 0;
let dislikeCount = 0;
const favouriteItems = [];

function renderComments() {
    const list = document.getElementById("commentsList");
    list.innerHTML = "";
    comments.forEach(function (entry) {
        const row = document.createElement("div");
        row.className = "comment";
        row.innerText = entry.name + ": " + entry.text;
        list.appendChild(row);
    });
}

function addComment() {
    const name = document.getElementById("commentName").value.trim();
    const comment = document.getElementById("commentText").value.trim();

    if (!name || !comment) {
        alert("Please enter your name and comment.");
        return;
    }

    comments.push({ name: name, text: comment });
    renderComments();

    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";
}

function voteProduct(kind) {
    if (productVote) {
        return;
    }
    productVote = kind;
    if (kind === "like") {
        likeCount += 1;
        document.getElementById("likeCount").textContent = String(likeCount);
    } else {
        dislikeCount += 1;
        document.getElementById("dislikeCount").textContent = String(dislikeCount);
    }
    document.getElementById("likeBtn").disabled = true;
    document.getElementById("dislikeBtn").disabled = true;
}

function renderFavourites() {
    const box = document.getElementById("favouriteList");
    if (!favouriteItems.length) {
        box.textContent = "Favourite list: none yet.";
        return;
    }
    box.textContent = "Favourite list: " + favouriteItems.join(", ");
}

function toggleFavourite() {
    const title = document.getElementById("detailTitle").textContent;
    const index = favouriteItems.indexOf(title);
    if (index === -1) {
        favouriteItems.push(title);
        document.getElementById("favBtn").textContent = "Remove from favourites";
    } else {
        favouriteItems.splice(index, 1);
        document.getElementById("favBtn").textContent = "Add to favourites";
    }
    renderFavourites();
}

renderComments();
renderFavourites();

/* Demo 3: products */

const productList = [
    {
        id: "laptop",
        name: "HP Envy x360",
        description: "Convertible laptop for study and office work.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "macbook",
        name: "Apple MacBook Air",
        description: "Lightweight Apple laptop with a long battery life.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "desktop",
        name: "HP ProOne 400",
        description: "All-in-one desktop computer for the office.",
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80"
    }
];

function findProduct(id) {
    return productList.filter(function (item) {
        return item.id === id;
    })[0];
}

function showSelectedProduct(product) {
    document.getElementById("selectedName").innerText = product.name;
    document.getElementById("selectedProductImage").src = product.image;
    const desc = document.getElementById("selectedPrice");
    desc.innerText = product.description;
}

function populateProductSelect() {
    const select = document.getElementById("productSelect");
    select.innerHTML = "";
    productList.forEach(function (item) {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
    });
    showSelectedProduct(productList[0]);
}

function changeProduct() {
    const product = findProduct(document.getElementById("productSelect").value);
    if (product) {
        showSelectedProduct(product);
    }
}

function addNewProduct() {
    const name = document.getElementById("newProductName").value.trim();
    const description = document.getElementById("newProductDesc").value.trim();
    const image = document.getElementById("newProductImage").value.trim();

    if (!name || !description || !image) {
        alert("Please enter a title, description and image URL.");
        return;
    }

    const id = "item" + Date.now();
    productList.push({ id: id, name: name, description: description, image: image });
    populateProductSelect();
    document.getElementById("productSelect").value = id;
    showSelectedProduct(productList[productList.length - 1]);

    document.getElementById("newProductName").value = "";
    document.getElementById("newProductDesc").value = "";
    document.getElementById("newProductImage").value = "";
}

populateProductSelect();

function filterProducts() {
    const query = (document.getElementById("productSearch").value || "").trim().toLowerCase();
    Array.prototype.forEach.call(document.querySelectorAll(".shopping-card"), function (card) {
        const haystack = card.textContent.toLowerCase();
        const hide = Boolean(query) && haystack.indexOf(query) === -1;
        card.hidden = hide;
        card.style.display = hide ? "none" : "";
    });
}

function applyHeaderProductFilter(query) {
    const term = (query || "").trim();
    showDemo(4);
    const input = document.getElementById("productSearch");
    if (input) {
        input.value = term;
    }
    filterProducts();

    document.querySelectorAll(".shopping-card").forEach(function (card) {
        card.classList.remove("product-hit");
        if (!card.hidden) {
            card.classList.add("product-hit");
        }
    });

    const grid = document.querySelector(".shopping-grid");
    if (grid) {
        window.setTimeout(function () {
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    }
}
window.applyHeaderProductFilter = applyHeaderProductFilter;

function sortProductsByPrice() {
    const grid = document.querySelector(".shopping-grid");
    const cards = Array.prototype.slice.call(grid.querySelectorAll(".shopping-card"));
    cards.sort(function (a, b) {
        return Number(a.getAttribute("data-price")) - Number(b.getAttribute("data-price"));
    });
    cards.forEach(function (card) {
        grid.appendChild(card);
    });
}

/* Demo 4: Supabase users table + shop dashboard */

const supabaseClient = window.supabase.createClient(
    "https://umdisahukybyvbqwhxvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZGlzYWh1a3lieXZicXdoeHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNTU0NjksImV4cCI6MjEwMTYzMTQ2OX0.bqtkm68zHoKTMlgi4gTEIoGFwXRs6s4dX9UJN3VN5hU"
);

function showAuthMessage(id, text, isError) {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    el.hidden = false;
    el.textContent = text;
    el.classList.toggle("auth-error", Boolean(isError));
}

function authErrorMessage(error, fallback) {
    const message = (error && error.message) || "";
    if (/already registered|already been registered|already exists/i.test(message)) {
        return "That email already has an account. Sign in instead.";
    }
    if (/invalid login|invalid credentials|email or password/i.test(message)) {
        return "Email or password is not correct.";
    }
    return message || fallback;
}

async function fetchCurrentUser() {
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !sessionData || !sessionData.session || !sessionData.session.user) {
        return null;
    }

    const authUser = sessionData.session.user;
    const { data: row } = await supabaseClient
        .from("users")
        .select("id, full_name, email, phone")
        .eq("id", authUser.id)
        .maybeSingle();

    if (row) {
        return row;
    }

    return {
        id: authUser.id,
        full_name: (authUser.user_metadata && authUser.user_metadata.full_name) || "",
        email: authUser.email || "",
        phone: (authUser.user_metadata && authUser.user_metadata.phone) || ""
    };
}

function setLoginCookie(email) {
    document.cookie = "shopLoggedIn=" + encodeURIComponent(email || "1") + "; path=/; max-age=" + (60 * 60 * 24 * 7) + "; SameSite=Lax";
}

function clearLoginCookie() {
    document.cookie = "shopLoggedIn=; path=/; max-age=0; SameSite=Lax";
}

function fillProfile(user) {
    document.getElementById("welcomeLine").textContent = "Signed in as " + user.full_name + ".";
    document.getElementById("profileName").value = user.full_name || "";
    document.getElementById("profileEmail").value = user.email || "";
    document.getElementById("profilePhone").value = user.phone || "";
}

async function refreshAuthView() {
    const gate = document.getElementById("authGate");
    const app = document.getElementById("shopApp");
    if (!gate || !app) {
        return;
    }

    const user = await fetchCurrentUser();
    if (user) {
        fillProfile(user);
        setLoginCookie(user.email || user.full_name);
        gate.hidden = true;
        app.hidden = false;
        window.setTimeout(initShopDashboard, 80);
    } else {
        clearLoginCookie();
        gate.hidden = false;
        app.hidden = true;
    }
}

const AUTH_FIELD_IDS = [
    "email",
    "signinPassword",
    "signupName",
    "signupEmail",
    "signupPhone",
    "signupPassword"
];

function lockAuthField(input) {
    input.setAttribute("readonly", "readonly");
}

function unlockAuthField(input) {
    input.removeAttribute("readonly");
}

function clearAuthFields() {
    const active = document.activeElement;
    if (active && AUTH_FIELD_IDS.indexOf(active.id) !== -1) {
        return;
    }
    AUTH_FIELD_IDS.forEach(function (id) {
        const input = document.getElementById(id);
        if (!input) {
            return;
        }
        input.value = "";
        lockAuthField(input);
    });
}

function bindAuthFieldLocks() {
    AUTH_FIELD_IDS.forEach(function (id) {
        const input = document.getElementById(id);
        if (!input || input.dataset.authLockBound === "1") {
            return;
        }
        input.dataset.authLockBound = "1";
        lockAuthField(input);
        input.addEventListener("focus", function () {
            window.setTimeout(function () {
                unlockAuthField(input);
            }, 200);
        });
    });
}

function showAuthTab(which) {
    const signin = which === "signin";
    document.getElementById("signinForm").hidden = !signin;
    document.getElementById("signupForm").hidden = signin;
    document.getElementById("tabSignin").classList.toggle("active", signin);
    document.getElementById("tabSignup").classList.toggle("active", !signin);
    document.getElementById("authTitle").textContent = signin ? "Sign in" : "Sign up";
    clearAuthFields();
    window.setTimeout(clearAuthFields, 120);
}

function openAuthModal(which) {
    bindAuthFieldLocks();
    showAuthTab(which || "signin");
    document.getElementById("signinMessage").hidden = true;
    document.getElementById("signupMessage").hidden = true;
    document.getElementById("authModal").hidden = false;
}

function closeAuthModal() {
    document.getElementById("authModal").hidden = true;
}

let authBackdropPointerDown = false;

document.getElementById("authModal").addEventListener("pointerdown", function (event) {
    authBackdropPointerDown = event.target.id === "authModal";
});

document.getElementById("authModal").addEventListener("click", function (event) {
    if (event.target.id === "authModal" && authBackdropPointerDown) {
        closeAuthModal();
    }
    authBackdropPointerDown = false;
});

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const fullName = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                phone: phone
            }
        }
    });

    if (error) {
        showAuthMessage("signupMessage", authErrorMessage(error, "Could not create the account."), true);
        return;
    }

    if (!data.session) {
        const signedIn = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (signedIn.error || !signedIn.data.session) {
            showAuthMessage("signupMessage", "Account created. Sign in with the same email and password.", false);
            showAuthTab("signin");
            return;
        }
    }

    closeAuthModal();
    refreshAuthView();
});

document.getElementById("signinForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("signinPassword").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error || !data.session) {
        showAuthMessage("signinMessage", authErrorMessage(error, "Email or password is not correct."), true);
        return;
    }

    closeAuthModal();
    refreshAuthView();
});

document.getElementById("profileForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const fullName = document.getElementById("profileName").value.trim();
    const phone = document.getElementById("profilePhone").value.trim();
    const message = document.getElementById("profileMessage");

    const user = await fetchCurrentUser();
    if (!user) {
        message.hidden = false;
        message.classList.add("auth-error");
        message.textContent = "Please sign in again.";
        return;
    }

    const { error } = await supabaseClient
        .from("users")
        .update({
            full_name: fullName,
            phone: phone || null
        })
        .eq("id", user.id);

    if (error) {
        message.hidden = false;
        message.classList.add("auth-error");
        message.textContent = error.message || "Could not update your details.";
        return;
    }

    message.hidden = false;
    message.classList.remove("auth-error");
    message.textContent = "Your details were updated.";
    refreshAuthView();
});

async function signOutUser() {
    await supabaseClient.auth.signOut();
    refreshAuthView();
}

/* Shop dashboard: Chart.js line / bar / pie + FullCalendar */
let shopCharts = [];
let shopCalendar = null;

function initShopDashboard() {
    const shopApp = document.getElementById("shopApp");
    if (!shopApp || shopApp.hidden) {
        return;
    }
    if (typeof Chart === "undefined" || typeof FullCalendar === "undefined") {
        return;
    }

    shopCharts.forEach(function (chart) {
        chart.destroy();
    });
    shopCharts = [];

    const line = document.getElementById("lineChart");
    const bar = document.getElementById("barChart");
    const pie = document.getElementById("pieChart");
    if (!line || !bar || !pie) {
        return;
    }

    shopCharts.push(new Chart(line, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Sales ($)",
                data: [420, 680, 510, 890, 760, 1200, 940],
                borderColor: "#174f08",
                backgroundColor: "rgba(155, 212, 124, 0.35)",
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    }));

    shopCharts.push(new Chart(bar, {
        type: "bar",
        data: {
            labels: ["Envy", "MacBook", "ProOne", "XPS", "TUF", "Surface"],
            datasets: [{
                label: "Units sold",
                data: [12, 18, 7, 9, 5, 11],
                backgroundColor: ["#ffbd00", "#4e9a06", "#1e4fc2", "#c2410c", "#7b3fa3", "#0A66C2"]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    }));

    shopCharts.push(new Chart(pie, {
        type: "pie",
        data: {
            labels: ["Laptops", "Desktops", "Gaming"],
            datasets: [{
                data: [62, 21, 17],
                backgroundColor: ["#ffbd00", "#1e4fc2", "#c2410c"]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    }));

    const calendarEl = document.getElementById("shopCalendar");
    if (shopCalendar) {
        shopCalendar.render();
        shopCalendar.updateSize();
        return;
    }
    shopCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        height: 420,
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,listWeek"
        },
        events: [
            { title: "Stock delivery", start: "2026-08-28" },
            { title: "Weekend sale", start: "2026-08-29", end: "2026-08-31" },
            { title: "MacBook restock", start: "2026-09-02" },
            { title: "Customer pickup", start: "2026-09-04" }
        ]
    });
    shopCalendar.render();
}

/* Demo 4: shopping cart */

let cart = [];

function updateCartBadge() {
    const badge = document.getElementById("cartBadge");
    if (!badge) {
        return;
    }
    if (cart.length === 0) {
        badge.hidden = true;
        badge.textContent = "0";
        return;
    }
    badge.hidden = false;
    badge.textContent = String(cart.length);
}

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    viewCart();
}

function viewCart() {
    const cartOutput = document.getElementById("cartOutput");
    cartOutput.style.display = "block";
    updateCartBadge();

    if (cart.length === 0) {
        cartOutput.innerHTML = "<h3>Your cart is empty.</h3>";
    } else {
        let total = 0;
        let html = "<h3>Shopping Cart</h3>";

        cart.forEach(function (item, index) {
            html += "<div class=\"cart-item\">" + (index + 1) + ". " + item.name + " - $" + item.price + "</div>";
            total += item.price;
        });

        html += "<p class=\"cart-total\"><strong>Total: $" + total + "</strong></p>";
        html += "<button type=\"button\" class=\"checkout-btn\" onclick=\"checkoutCart()\">CHECKOUT</button>";
        cartOutput.innerHTML = html;
    }

    window.setTimeout(function () {
        cartOutput.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
}

function clearCart() {
    cart = [];
    updateCartBadge();
    const cartOutput = document.getElementById("cartOutput");
    cartOutput.style.display = "block";
    cartOutput.innerHTML = "<h3>Shopping cart cleared.</h3>";
}

function openBuyForm(name, price) {
    const form = document.getElementById("buyForm");
    document.getElementById("buyTitle").textContent = "Buy product";
    document.getElementById("buyProductName").textContent = name;
    document.getElementById("buyProductPrice").textContent = "$" + price;
    form.dataset.product = name;
    form.dataset.price = String(price);
    form.dataset.checkout = "";
    document.getElementById("buyMessage").hidden = true;
    form.reset();
    document.getElementById("buyQty").value = "1";
    document.getElementById("buyModal").hidden = false;
}

function checkoutCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let total = 0;
    const names = cart.map(function (item) {
        total += item.price;
        return item.name;
    }).join(", ");

    openBuyForm(names, total);
    document.getElementById("buyTitle").textContent = "Checkout";
    document.getElementById("buyQty").value = "1";
    document.getElementById("buyForm").dataset.checkout = "1";
}

function closeBuyForm() {
    document.getElementById("buyModal").hidden = true;
}

document.getElementById("buyForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = this.dataset.product;
    const price = Number(this.dataset.price);
    const qty = Number(document.getElementById("buyQty").value);
    const customer = document.getElementById("buyName").value.trim();
    const message = document.getElementById("buyMessage");

    message.hidden = false;
    message.textContent = "Thanks " + customer + "! Your order for " +
        qty + " x " + name + " ($" + (price * qty) + ") has been placed.";

    if (this.dataset.checkout === "1") {
        cart = [];
        updateCartBadge();
        const cartOutput = document.getElementById("cartOutput");
        cartOutput.style.display = "block";
        cartOutput.innerHTML = "<h3>Order placed. Your cart is now empty.</h3>";
    }

    setTimeout(closeBuyForm, 1400);
});

document.getElementById("buyModal").addEventListener("click", function (event) {
    if (event.target.id === "buyModal") {
        closeBuyForm();
    }
});

function highlightProduct(hash) {
    const wanted = hash.replace("#product-", "").replace(/-/g, " ");

    document.querySelectorAll(".shopping-card").forEach(function (card) {
        card.classList.remove("product-hit");
        const title = card.querySelector("h3");
        if (title && title.textContent.toLowerCase().indexOf(wanted) !== -1) {
            card.classList.add("product-hit");
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
}

function openDemoFromHash() {
    const hash = (window.location.hash || "").toLowerCase();

    if (hash === "#demo2") {
        showDemo(2);
    } else if (hash === "#demo3") {
        showDemo(3);
    } else if (hash === "#demo4" || hash.indexOf("#product-") === 0) {
        showDemo(4);
        highlightProduct(hash);
    } else if (hash === "#demo1") {
        showDemo(1);
    }
}

window.addEventListener("hashchange", openDemoFromHash);
openDemoFromHash();
refreshAuthView();

(function applySearchQuery() {
    const query = new URLSearchParams(window.location.search).get("q");
    if (query) {
        applyHeaderProductFilter(query);
    }
}());
