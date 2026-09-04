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

const COMMENTS_KEY = "demo2Comments";
const defaultComments = [
    { name: "Ian", text: "Recommended, good one" },
    { name: "Aman", text: "I don't like the color" },
    { name: "John", text: "Love it" }
];

function loadComments() {
    try {
        const saved = JSON.parse(localStorage.getItem(COMMENTS_KEY) || "null");
        if (Array.isArray(saved) && saved.length) {
            return saved.filter(function (entry) {
                return entry && typeof entry.name === "string" && typeof entry.text === "string";
            });
        }
    } catch (error) {
        return defaultComments.slice();
    }
    return defaultComments.slice();
}

function saveComments() {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

const comments = loadComments();
const DEMO2_STATE_KEY = "demo2VoteFav";

function loadDemo2State() {
    try {
        const saved = JSON.parse(localStorage.getItem(DEMO2_STATE_KEY) || "null");
        if (!saved) {
            return { productVote: null, likeCount: 0, dislikeCount: 0, favouriteItems: [] };
        }
        return {
            productVote: saved.productVote === "like" || saved.productVote === "dislike" ? saved.productVote : null,
            likeCount: Number(saved.likeCount) > 0 ? Number(saved.likeCount) : 0,
            dislikeCount: Number(saved.dislikeCount) > 0 ? Number(saved.dislikeCount) : 0,
            favouriteItems: Array.isArray(saved.favouriteItems)
                ? saved.favouriteItems.filter(function (item) {
                    return typeof item === "string" && item;
                })
                : []
        };
    } catch (error) {
        return { productVote: null, likeCount: 0, dislikeCount: 0, favouriteItems: [] };
    }
}

function saveDemo2State() {
    localStorage.setItem(DEMO2_STATE_KEY, JSON.stringify({
        productVote: productVote,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        favouriteItems: favouriteItems
    }));
}

const demo2State = loadDemo2State();
let productVote = demo2State.productVote;
let likeCount = demo2State.likeCount;
let dislikeCount = demo2State.dislikeCount;
const favouriteItems = demo2State.favouriteItems;

function renderComments() {
    const list = document.getElementById("commentsList");
    if (!list) {
        return;
    }
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
    saveComments();
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
    saveDemo2State();
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
    saveDemo2State();
    renderFavourites();
}

function applyDemo2VoteUi() {
    const likeCountEl = document.getElementById("likeCount");
    const dislikeCountEl = document.getElementById("dislikeCount");
    const likeBtn = document.getElementById("likeBtn");
    const dislikeBtn = document.getElementById("dislikeBtn");
    const favBtn = document.getElementById("favBtn");
    const title = document.getElementById("detailTitle");
    if (likeCountEl) {
        likeCountEl.textContent = String(likeCount);
    }
    if (dislikeCountEl) {
        dislikeCountEl.textContent = String(dislikeCount);
    }
    if (productVote && likeBtn && dislikeBtn) {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
    if (favBtn && title && favouriteItems.indexOf(title.textContent) !== -1) {
        favBtn.textContent = "Remove from favourites";
    }
}

applyDemo2VoteUi();
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

const CART_KEY = "demo4Cart";
const CART_MAX_QTY = 99;

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (!Array.isArray(saved)) {
            return [];
        }
        return saved.filter(function (item) {
            return item && typeof item.name === "string" && Number(item.price) > 0 && Number(item.qty) > 0;
        }).map(function (item) {
            return {
                name: item.name,
                price: Number(item.price),
                qty: Math.min(CART_MAX_QTY, Math.max(1, Math.floor(Number(item.qty))))
            };
        });
    } catch (error) {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();

function cartQtyTotal() {
    return cart.reduce(function (sum, item) {
        return sum + item.qty;
    }, 0);
}

function cartPriceTotal() {
    return cart.reduce(function (sum, item) {
        return sum + item.price * item.qty;
    }, 0);
}

function updateCartBadge() {
    const badge = document.getElementById("cartBadge");
    if (!badge) {
        return;
    }
    const count = cartQtyTotal();
    if (count === 0) {
        badge.hidden = true;
        badge.textContent = "0";
        return;
    }
    badge.hidden = false;
    badge.textContent = String(count);
}

function addToCart(name, price) {
    let existing = null;
    cart.forEach(function (item) {
        if (item.name === name) {
            existing = item;
        }
    });
    if (existing) {
        existing.qty = Math.min(CART_MAX_QTY, existing.qty + 1);
    } else {
        cart.push({ name: name, price: Number(price), qty: 1 });
    }
    saveCart();
    viewCart();
}

function changeCartQty(index, delta) {
    if (!cart[index]) {
        return;
    }
    cart[index].qty += delta;
    if (cart[index].qty < 1) {
        cart.splice(index, 1);
    } else if (cart[index].qty > CART_MAX_QTY) {
        cart[index].qty = CART_MAX_QTY;
    }
    saveCart();
    renderCart(false);
}

function removeCartItem(index) {
    if (!cart[index]) {
        return;
    }
    cart.splice(index, 1);
    saveCart();
    renderCart(false);
}

function renderCart(shouldScroll) {
    const cartOutput = document.getElementById("cartOutput");
    if (!cartOutput) {
        return;
    }
    cartOutput.style.display = "block";
    updateCartBadge();

    if (cart.length === 0) {
        cartOutput.innerHTML = "<h3>Your cart is empty.</h3>";
    } else {
        const count = cartQtyTotal();
        const total = cartPriceTotal();
        let html = "<h3>Shopping Cart</h3>";
        html += "<p class=\"cart-count-line\">" + count + (count === 1 ? " item" : " items") + "</p>";

        cart.forEach(function (item, index) {
            html += "<div class=\"cart-item\">";
            html += "<div class=\"cart-item-info\"><strong>" + item.name + "</strong><span>$" + item.price + " each</span></div>";
            html += "<div class=\"qty-stepper\">";
            html += "<button type=\"button\" class=\"qty-btn\" onclick=\"changeCartQty(" + index + ", -1)\" aria-label=\"Remove one\">−</button>";
            html += "<span class=\"card-qty\">" + item.qty + "</span>";
            html += "<button type=\"button\" class=\"qty-btn\" onclick=\"changeCartQty(" + index + ", 1)\" aria-label=\"Add one\">+</button>";
            html += "</div>";
            html += "<span class=\"cart-item-subtotal\">$" + (item.price * item.qty) + "</span>";
            html += "<button type=\"button\" class=\"cart-remove-btn\" onclick=\"removeCartItem(" + index + ")\">Remove</button>";
            html += "</div>";
        });

        html += "<p class=\"cart-total\"><strong>Total: $" + total + "</strong></p>";
        html += "<button type=\"button\" class=\"checkout-btn\" onclick=\"checkoutCart()\">CHECKOUT</button>";
        cartOutput.innerHTML = html;
    }

    if (shouldScroll) {
        window.setTimeout(function () {
            cartOutput.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
    }
}

function viewCart() {
    renderCart(true);
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartBadge();
    const cartOutput = document.getElementById("cartOutput");
    cartOutput.style.display = "block";
    cartOutput.innerHTML = "<h3>Shopping cart cleared.</h3>";
}

function setBuyQtyVisible(show) {
    const row = document.getElementById("buyQtyRow");
    if (row) {
        row.hidden = !show;
    }
    const input = document.getElementById("buyQty");
    if (input && !show) {
        input.value = "1";
    }
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
    setBuyQtyVisible(true);
    document.getElementById("buyModal").hidden = false;
}

function checkoutCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const names = cart.map(function (item) {
        return item.name + " × " + item.qty;
    }).join(", ");

    openBuyForm(names, cartPriceTotal());
    document.getElementById("buyTitle").textContent = "Checkout";
    document.getElementById("buyForm").dataset.checkout = "1";
    setBuyQtyVisible(false);
}

function closeBuyForm() {
    document.getElementById("buyModal").hidden = true;
}

const ORDERS_KEY = "demo4Orders";

function escapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function loadOrders() {
    try {
        const saved = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

function saveOrder(order) {
    const orders = loadOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 20)));
}

function hideOrders() {
    const box = document.getElementById("ordersOutput");
    if (box) {
        box.style.display = "none";
        box.innerHTML = "";
    }
    const grid = document.querySelector(".shopping-grid");
    if (grid) {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function viewOrders() {
    const box = document.getElementById("ordersOutput");
    if (!box) {
        return;
    }
    box.style.display = "block";
    const orders = loadOrders();
    let html = "<h3>Your orders</h3>";
    if (!orders.length) {
        html += "<p>No orders yet. Place an order with BUY or CHECKOUT.</p>";
    } else {
        html += "<p class=\"cart-count-line\">Saved in this browser · " + orders.length +
            (orders.length === 1 ? " order" : " orders") + "</p>";
        orders.forEach(function (order, index) {
            html += "<article class=\"order-card\">";
            html += "<p><strong>Order " + (orders.length - index) + "</strong> · " + escapeHtml(order.date) + "</p>";
            html += "<p>" + escapeHtml(order.customer) + " · " + escapeHtml(order.email) + " · " + escapeHtml(order.phone) + "</p>";
            html += "<p>" + escapeHtml(order.address) + "</p>";
            (order.items || []).forEach(function (item) {
                html += "<div class=\"cart-item\">" + escapeHtml(item.qty) + " × " + escapeHtml(item.name) +
                    " — $" + escapeHtml(item.price * item.qty) + "</div>";
            });
            html += "<p class=\"cart-total\"><strong>Total: $" + escapeHtml(order.total) + "</strong> · " +
                escapeHtml(order.payment) + "</p>";
            html += "</article>";
        });
    }
    html += "<div class=\"orders-footer\">";
    html += "<button type=\"button\" class=\"back-btn\" onclick=\"hideOrders()\">BACK</button>";
    html += "</div>";
    box.innerHTML = html;
    window.setTimeout(function () {
        box.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
}

document.getElementById("buyForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = this.dataset.product;
    const price = Number(this.dataset.price);
    const isCheckout = this.dataset.checkout === "1";
    const qty = isCheckout ? 1 : Number(document.getElementById("buyQty").value);
    const customer = document.getElementById("buyName").value.trim();
    const email = document.getElementById("buyEmail").value.trim();
    const phone = document.getElementById("buyPhone").value.trim();
    const address = document.getElementById("buyAddress").value.trim();
    const payment = document.getElementById("buyPay").value;
    const message = document.getElementById("buyMessage");

    let items;
    let total;
    if (isCheckout) {
        items = cart.map(function (item) {
            return { name: item.name, price: item.price, qty: item.qty };
        });
        total = cartPriceTotal();
    } else {
        items = [{ name: name, price: price, qty: qty }];
        total = price * qty;
    }

    saveOrder({
        date: new Date().toLocaleString(),
        customer: customer,
        email: email,
        phone: phone,
        address: address,
        payment: payment,
        items: items,
        total: total
    });

    message.hidden = false;
    message.textContent = "Thanks " + customer + "! Your order for " +
        (isCheckout ? name : qty + " x " + name) + " ($" + (price * qty) + ") has been placed. Open View orders to see it.";

    if (isCheckout) {
        cart = [];
        saveCart();
        updateCartBadge();
        const cartOutput = document.getElementById("cartOutput");
        cartOutput.style.display = "block";
        cartOutput.innerHTML = "<h3>Order placed. Your cart is now empty.</h3>";
    }

    setTimeout(function () {
        closeBuyForm();
        viewOrders();
    }, 1400);
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
updateCartBadge();

(function applySearchQuery() {
    const query = new URLSearchParams(window.location.search).get("q");
    if (query) {
        applyHeaderProductFilter(query);
    }
}());
