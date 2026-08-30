const btnHtml = document.getElementById("btnHtml");
const btnGoogle = document.getElementById("btnGoogle");
const htmlPanel = document.getElementById("htmlPanel");
const googlePanel = document.getElementById("googlePanel");

const supabaseClient = window.supabase.createClient(
    "https://umdisahukybyvbqwhxvg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZGlzYWh1a3lieXZicXdoeHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNTU0NjksImV4cCI6MjEwMTYzMTQ2OX0.bqtkm68zHoKTMlgi4gTEIoGFwXRs6s4dX9UJN3VN5hU"
);

function showPanel(name) {
    const isHtml = name === "htmlPanel";
    htmlPanel.classList.toggle("hidden", !isHtml);
    googlePanel.classList.toggle("hidden", isHtml);
    btnHtml.classList.toggle("active", isHtml);
    btnGoogle.classList.toggle("active", !isHtml);
}

btnHtml.addEventListener("click", function () {
    showPanel("htmlPanel");
});

btnGoogle.addEventListener("click", function () {
    showPanel("googlePanel");
});

if (window.location.hash === "#google") {
    showPanel("googlePanel");
}

function saveSubmission(entry) {
    const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
    submissions.unshift(entry);
    localStorage.setItem("formSubmissions", JSON.stringify(submissions.slice(0, 8)));
}

function checkedValues(name) {
    return Array.prototype.map.call(
        document.querySelectorAll('input[name="' + name + '"]:checked'),
        function (input) {
            return input.value;
        }
    ).join(", ");
}

function isValidPersonName(value) {
    return /^[A-Za-z][A-Za-z' \-]{0,48}$/.test(value) && value.replace(/[^A-Za-z]/g, "").length >= 2;
}

function showFormMessage(el, text, isError) {
    el.hidden = false;
    el.textContent = text;
    el.classList.toggle("form-error", Boolean(isError));
    el.classList.toggle("form-ok", !isError);
}

function validateHtmlForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const gender = (document.querySelector('input[name="gender"]:checked') || {}).value || "";

    if (!firstName || !lastName) {
        return "Please enter your first name and last name.";
    }
    if (!isValidPersonName(firstName) || !isValidPersonName(lastName)) {
        return "Names must be at least 2 letters and can include spaces, hyphens or apostrophes.";
    }
    if (!document.getElementById("line1").value.trim()) {
        return "Please enter address line 1.";
    }
    if (!document.getElementById("city").value.trim()) {
        return "Please enter your town or city.";
    }
    if (!gender) {
        return "Please select a gender.";
    }
    return "";
}

function readHtmlForm() {
    return {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        line1: document.getElementById("line1").value.trim(),
        line2: document.getElementById("line2").value.trim(),
        city: document.getElementById("city").value.trim(),
        gender: (document.querySelector('input[name="gender"]:checked') || {}).value || "",
        phoneType: checkedValues("phoneType"),
        provider: document.getElementById("provider").value,
        study: document.getElementById("study").value.trim()
    };
}

const LAST_HTML_FORM_KEY = "lastHtmlFormData";
const htmlForm = document.getElementById("htmlForm");
const htmlMessage = document.getElementById("htmlMessage");

function fillHtmlForm(entry) {
    if (!entry) {
        return;
    }
    document.getElementById("firstName").value = entry.firstName || "";
    document.getElementById("lastName").value = entry.lastName || "";
    document.getElementById("line1").value = entry.line1 || "";
    document.getElementById("line2").value = entry.line2 || "";
    document.getElementById("city").value = entry.city || "";
    document.getElementById("provider").value = entry.provider || "None";
    document.getElementById("study").value = entry.study || "";

    Array.prototype.forEach.call(document.querySelectorAll('input[name="gender"]'), function (radio) {
        radio.checked = radio.value === entry.gender;
    });

    const types = (entry.phoneType || "").split(", ").filter(Boolean);
    Array.prototype.forEach.call(document.querySelectorAll('input[name="phoneType"]'), function (box) {
        box.checked = types.indexOf(box.value) !== -1;
    });
}

htmlForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const errorText = validateHtmlForm();
    if (errorText) {
        showFormMessage(htmlMessage, errorText, true);
        return;
    }

    const entry = readHtmlForm();

    const row = {
        fname: entry.firstName,
        lname: entry.lastName,
        gender: entry.gender,
        line1: entry.line1 || null,
        line2: entry.line2 || null,
        city: entry.city || null,
        phone_type: entry.phoneType || null,
        provider: entry.provider,
        study: entry.study || null
    };

    const saved = await supabaseClient.from("mobile-uses").insert(row);
    if (saved.error) {
        showFormMessage(htmlMessage, "Could not save to the database. " + (saved.error.message || ""), true);
        return;
    }

    await supabaseClient.from("mobiletechnologyform").insert(row);

    saveSubmission(entry);
    sessionStorage.setItem(LAST_HTML_FORM_KEY, JSON.stringify(entry));
    showFormMessage(htmlMessage, "Your response has been recorded.", false);
});

htmlForm.addEventListener("reset", function () {
    htmlMessage.hidden = true;
    htmlMessage.textContent = "";
    htmlMessage.classList.remove("form-error", "form-ok");
    sessionStorage.removeItem(LAST_HTML_FORM_KEY);
});

try {
    fillHtmlForm(JSON.parse(sessionStorage.getItem(LAST_HTML_FORM_KEY) || "null"));
} catch (error) {
    /* ignore stored data if it is not valid JSON */
}

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1DgLCTzVyn34sbmOsTUlUaTlJYFyOV_zqlUmr6svV2m8/edit?usp=sharing";

(function setupGoogleSheetLink() {
    const sheetLink = document.getElementById("googleSheetLink");
    if (sheetLink) {
        sheetLink.href = GOOGLE_SHEET_URL;
        sheetLink.textContent = "View responses in Google Sheets";
    }
}());
