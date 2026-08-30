const btnJson = document.getElementById("btnJson");
const btnRest = document.getElementById("btnRest");
const jsonPanel = document.getElementById("jsonPanel");
const restPanel = document.getElementById("restPanel");
const restGrid = document.getElementById("restGrid");
const jsonSearch = document.getElementById("jsonSearch");
const restSearch = document.getElementById("restSearch");

const supabaseClient = window.supabase.createClient(
    "https://umdisahukybyvbqwhxvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZGlzYWh1a3lieXZicXdoeHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNTU0NjksImV4cCI6MjEwMTYzMTQ2OX0.bqtkm68zHoKTMlgi4gTEIoGFwXRs6s4dX9UJN3VN5hU"
);

let restRows = [];

function showPanel(name) {
    const isJson = name === "json";

    jsonPanel.classList.toggle("hidden", !isJson);
    restPanel.classList.toggle("hidden", isJson);

    btnJson.classList.toggle("active", isJson);
    btnRest.classList.toggle("active", !isJson);
}

btnJson.addEventListener("click", function () {
    showPanel("json");
});

btnRest.addEventListener("click", function () {
    showPanel("rest");
});

if (window.location.hash === "#rest") {
    showPanel("rest");
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function createCard(title, paragraphOne, paragraphTwo) {
    const card = document.createElement("article");
    card.className = "info-card";
    card.innerHTML =
        "<h2>" + escapeHtml(title) + "</h2>" +
        "<p>" + escapeHtml(paragraphOne) + "</p>" +
        "<p>" + escapeHtml(paragraphTwo) + "</p>";
    return card;
}

function filterJsonRules() {
    if (!jsonSearch) {
        return;
    }
    const query = (jsonSearch.value || "").trim().toLowerCase();
    Array.prototype.forEach.call(document.querySelectorAll("#jsonGrid .info-card"), function (card) {
        const haystack = (card.textContent + " " + (card.getAttribute("data-keywords") || "")).toLowerCase();
        const hide = Boolean(query) && haystack.indexOf(query) === -1;
        card.hidden = hide;
        card.style.display = hide ? "none" : "";
    });
}

if (jsonSearch) {
    jsonSearch.addEventListener("input", filterJsonRules);
    jsonSearch.addEventListener("search", filterJsonRules);
}

function rowMatches(entry, query) {
    if (!query) {
        return true;
    }
    const haystack = [
        entry.fname,
        entry.lname,
        entry.gender,
        entry.line1,
        entry.line2,
        entry.city,
        entry.phone_type,
        entry.provider,
        entry.study
    ].join(" ").toLowerCase();
    return haystack.indexOf(query) !== -1;
}

function renderRestGrid() {
    restGrid.innerHTML = "";
    const query = (restSearch.value || "").trim().toLowerCase();
    const matches = restRows.filter(function (entry) {
        return rowMatches(entry, query);
    });

    if (!matches.length) {
        restGrid.appendChild(
            createCard(
                "No records yet",
                "Submit the HTML form on the Forms page, then return here. This panel requests GET /rest/v1/mobile-uses from Supabase.",
                "If you already submitted, try clearing the search box."
            )
        );
        return;
    }

    matches.forEach(function (entry) {
        const title = ((entry.fname || "") + " " + (entry.lname || "")).trim() || "Submitted entry";
        const address = [entry.line1, entry.line2, entry.city].filter(Boolean).join(", ") || "No address provided.";
        const details = [
            entry.gender ? "Gender: " + entry.gender : "",
            entry.phone_type ? "Phone: " + entry.phone_type : "",
            entry.provider ? "Provider: " + entry.provider : "",
            entry.study ? entry.study : ""
        ].filter(Boolean).join(" ");

        restGrid.appendChild(createCard(title, address, details || "No extra details."));
    });
}

restSearch.addEventListener("input", renderRestGrid);

async function loadSubmittedData() {
    const { data, error } = await supabaseClient
        .from("mobile-uses")
        .select("fname, lname, gender, line1, line2, city, phone_type, provider, study, created_at")
        .order("created_at", { ascending: false })
        .limit(24);

    if (error) {
        restRows = [];
        restGrid.innerHTML = "";
        restGrid.appendChild(
            createCard(
                "Could not load server data",
                error.message || "The REST request to Supabase failed.",
                "Check the anon key and that the mobile-uses table allows SELECT."
            )
        );
        return;
    }

    restRows = data || [];
    renderRestGrid();
}

loadSubmittedData();
