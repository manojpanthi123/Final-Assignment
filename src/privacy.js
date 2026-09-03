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
                "<p><strong>Last Updated:</strong> 30/8/2026</p>" +
                "<h3>1. Information We Collect</h3>" +
                "<p>We may collect personal information such as your name, email address, phone number, address answers, and account details when you register, submit a form, or use this website.</p>" +
                "<h3>2. How We Use Your Information</h3>" +
                "<p>We use your information to:</p>" +
                "<ul>" +
                    "<li>Provide website services</li>" +
                    "<li>Improve user experience</li>" +
                    "<li>Respond to enquiries</li>" +
                    "<li>Maintain website security</li>" +
                "</ul>" +
                "<h3>3. Sharing Information</h3>" +
                "<p>We do not sell or rent personal information to third parties. Information may only be shared when required by law or to provide our services (for example storing form answers in Supabase or Google Sheets for this assignment).</p>" +
                "<h3>4. Data Security</h3>" +
                "<p>We use appropriate security measures to protect your personal information against unauthorized access, loss, or misuse.</p>" +
                "<h3>5. Your Rights</h3>" +
                "<p>You have the right to:</p>" +
                "<ul>" +
                    "<li>Access your personal information</li>" +
                    "<li>Request corrections to inaccurate information</li>" +
                    "<li>Request deletion of information where legally permitted</li>" +
                "</ul>" +
                "<h3>6. Cookies</h3>" +
                "<p>Our website may use cookies and browser storage (localStorage / sessionStorage) to improve functionality, remember form answers, login session, cart items, display preferences, and analyse website usage. You can clear these in your browser.</p>" +
                "<h3>7. Contact Us</h3>" +
                "<p>If you have questions about this Privacy Policy, please contact us at:</p>" +
                "<p>Email: support@mywebsite.com<br>" +
                "Phone: 06-974-8000<br>" +
                "Address: 501 Gloucester Street, Taradale, Napier 4112</p>" +
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
