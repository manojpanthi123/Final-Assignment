(function () {
    if (document.getElementById("privacyOverlay")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "privacyOverlay";
    overlay.className = "privacy-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
        '<div class="privacy-dialog" role="dialog" aria-labelledby="privacyTitle" aria-modal="true">' +
            '<div class="privacy-header">' +
                '<h2 id="privacyTitle">Privacy Policy</h2>' +
                '<button type="button" class="privacy-x" aria-label="Close">&times;</button>' +
            "</div>" +
            '<div class="privacy-body">' +
                "<p>This website (ITWD6.408 learning portfolio) collects personal information only when you choose to submit a form or create a shop account: name, email, phone, address answers, and comments you type. Data is stored in Supabase (including the mobile-uses table) and, if you use the Google Form, in a Google spreadsheet. It is used to mark and demonstrate the assignment, not sold to advertisers.</p>" +
                "<p>Cookies and browser storage (localStorage / sessionStorage) may remember form answers, login session, cart items and display preferences. You can clear these in your browser. You may ask to see or correct information by contacting Manoj Kumar Panthi via EIT.</p>" +
                "<p>This policy is written to match the Privacy Act 2020 information privacy principles: collect only what is needed, keep it secure, keep it accurate, and do not keep it longer than the course requires.</p>" +
                "<p>By clicking \"Agree\" you acknowledge that you have read and accept this privacy policy.</p>" +
            "</div>" +
            '<div class="privacy-footer">' +
                '<button type="button" class="privacy-close-btn">Close</button>' +
                '<button type="button" class="privacy-agree-btn">Agree</button>' +
            "</div>" +
        "</div>";

    document.body.appendChild(overlay);

    function openPrivacy() {
        overlay.hidden = false;
    }

    function closePrivacy() {
        overlay.hidden = true;
    }

    document.querySelectorAll("a.privacy").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openPrivacy();
        });
    });

    overlay.querySelector(".privacy-x").addEventListener("click", closePrivacy);
    overlay.querySelector(".privacy-close-btn").addEventListener("click", closePrivacy);
    overlay.querySelector(".privacy-agree-btn").addEventListener("click", closePrivacy);

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closePrivacy();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !overlay.hidden) {
            closePrivacy();
        }
    });
})();
