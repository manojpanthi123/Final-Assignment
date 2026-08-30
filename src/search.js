(function () {
    const catalog = [
        {
            title: "Home",
            hint: "Home page · Bio, technologies and authenticity",
            url: "index.html",
            keywords: "home portfolio bio technologies html css javascript authenticity"
        },
        {
            title: "Forms",
            hint: "Forms page · HTML survey",
            url: "form.html",
            keywords: "forms html form first name last name gender mobile"
        },
        {
            title: "HTML Form",
            hint: "Forms page · HTML FORM tab",
            url: "form.html",
            keywords: "html form required address city gender provider"
        },
        {
            title: "Google Form",
            hint: "Forms page · GOOGLE FORM tab · embedded form",
            url: "form.html#google",
            keywords: "google form mobile technology spreadsheet"
        },
        {
            title: "WebAPI",
            hint: "WebAPI page · JSON rules",
            url: "web-api.html",
            keywords: "webapi json rest api xml rules"
        },
        {
            title: "JSON Rules",
            hint: "WebAPI page · JSON RULES tab",
            url: "web-api.html",
            keywords: "json object array quotes commas"
        },
        {
            title: "REST API",
            hint: "WebAPI page · REST API tab · mobile-uses",
            url: "web-api.html#rest",
            keywords: "rest api submitted data forms supabase"
        },
        {
            title: "JavaScript",
            hint: "JavaScript page · four demos",
            url: "js-demo.html",
            keywords: "javascript demos slideshow cart products authentication dashboard charts calendar"
        },
        {
            title: "Demo 1 Slideshow",
            hint: "JavaScript · Demo 1 · automatic and manual slides",
            url: "js-demo.html#demo1",
            keywords: "demo 1 slideshow hp laptop macbook gaming"
        },
        {
            title: "Demo 2 Comments",
            hint: "JavaScript · Demo 2 · Samsung Galaxy comments",
            url: "js-demo.html#demo2",
            keywords: "demo 2 samsung galaxy comments like dislike favourites"
        },
        {
            title: "Demo 3 Product list",
            hint: "JavaScript · Demo 3 · dropdown products",
            url: "js-demo.html#demo3",
            keywords: "demo 3 hp envy macbook proone dropdown"
        },
        {
            title: "Demo 4 Shop",
            hint: "JavaScript · Demo 4 · shopping cart and dashboard",
            url: "js-demo.html#demo4",
            keywords: "demo 4 shop cart charts calendar sign in"
        },
        {
            title: "Research",
            hint: "Research page · six flip cards",
            url: "my-research.html",
            keywords: "research copyright creative commons fair use privacy seo hosting performance security"
        },
        {
            title: "Copyright, CC Licenses, Fair Use",
            hint: "Research page · first flip card",
            url: "my-research.html#copyright",
            keywords: "copyright creative commons cc licenses fair use public domain"
        },
        {
            title: "Privacy & Web Privacy Policy",
            hint: "Research page · privacy flip card",
            url: "my-research.html#privacy",
            keywords: "privacy policy cookies gdpr personal data"
        },
        {
            title: "How to Improve Website SEO",
            hint: "Research page · SEO flip card",
            url: "my-research.html#seo",
            keywords: "seo google search engine optimisation titles headings"
        },
        {
            title: "Choosing a Web Hosting Provider",
            hint: "Research page · hosting flip card",
            url: "my-research.html#hosting",
            keywords: "web hosting provider uptime ssl backups"
        },
        {
            title: "Web Performance and Maintenance",
            hint: "Research page · performance flip card",
            url: "my-research.html#performance",
            keywords: "web performance maintenance caching updates"
        },
        {
            title: "Web Security",
            hint: "Research page · security flip card",
            url: "my-research.html#security",
            keywords: "web security owasp https xss cyber attacks"
        },
        {
            title: "HP Laptop",
            hint: "JavaScript · Demo 1 slideshow",
            url: "js-demo.html#demo1",
            keywords: "hp laptop computer notebook students office slideshow demo 1 product",
            page: "js-demo.html"
        },
        {
            title: "Apple MacBook Air",
            hint: "JavaScript · Demo 1 slideshow",
            url: "js-demo.html#demo1",
            keywords: "apple macbook air laptop slideshow demo 1"
        },
        {
            title: "Gaming Laptop",
            hint: "JavaScript · Demo 1 slideshow",
            url: "js-demo.html#demo1",
            keywords: "gaming laptop high performance demo 1 asus tuf"
        },
        {
            title: "Samsung Galaxy",
            hint: "JavaScript · Demo 2 comments and votes",
            url: "js-demo.html#demo2",
            keywords: "samsung galaxy smartphone phone camera comments demo 2"
        },
        {
            title: "HP Envy x360",
            hint: "JavaScript · Demo 3 product dropdown",
            url: "js-demo.html#demo3",
            keywords: "hp envy x360 laptop demo 3 dropdown"
        },
        {
            title: "HP Envy x360",
            hint: "JavaScript · Demo 4 shopping cart · $2244",
            url: "js-demo.html#product-hp-envy-x360",
            keywords: "hp envy x360 laptop 2244 everyday work demo 4 shop cart",
            filter: "hp",
            demo: 4
        },
        {
            title: "Apple MacBook Air",
            hint: "JavaScript · Demo 4 shopping cart · $1349",
            url: "js-demo.html#product-apple-macbook-air",
            keywords: "apple macbook air laptop 1349 demo 4 shop cart",
            demo: 4
        },
        {
            title: "HP ProOne 400",
            hint: "JavaScript · Demo 4 shopping cart · $999",
            url: "js-demo.html#product-hp-proone-400",
            keywords: "hp proone 400 desktop 999 office demo 4 shop cart",
            filter: "hp",
            demo: 4
        },
        {
            title: "Dell XPS 13",
            hint: "JavaScript · Demo 4 shopping cart · $1509",
            url: "js-demo.html#product-dell-xps-13",
            keywords: "dell xps 13 laptop 1509 demo 4 shop cart",
            demo: 4
        },
        {
            title: "ASUS TUF Gaming",
            hint: "JavaScript · Demo 4 shopping cart · $2568",
            url: "js-demo.html#product-asus-tuf-gaming",
            keywords: "asus tuf gaming laptop 2568 demo 4 shop cart",
            demo: 4
        },
        {
            title: "Microsoft Surface",
            hint: "JavaScript · Demo 4 shopping cart · $1599",
            url: "js-demo.html#product-microsoft-surface",
            keywords: "microsoft surface touchscreen laptop 1599 demo 4 shop cart",
            demo: 4
        }
    ];

    const trigger = document.querySelector(".search-btn, .icon-btn[aria-label='Search']");
    if (!trigger) {
        return;
    }

    let box = trigger.closest(".search-box");
    if (!box) {
        box = document.createElement("div");
        box.className = "search-box";
        trigger.parentNode.insertBefore(box, trigger);
        box.appendChild(trigger);
        trigger.classList.add("search-btn");
    }

    let panel = box.querySelector(".search-panel");
    if (!panel) {
        panel = document.createElement("div");
        panel.className = "search-panel";
        panel.hidden = true;
        panel.innerHTML =
            '<form class="search-form" role="search">' +
            '<input class="search-input" type="search" placeholder="Search pages and products..." autocomplete="off">' +
            "</form>" +
            '<ul class="search-results" hidden></ul>';
        box.appendChild(panel);
    }

    const form = panel.querySelector(".search-form");
    const input = panel.querySelector(".search-input");
    const results = panel.querySelector(".search-results");

    function currentFile() {
        const name = (window.location.pathname.split("/").pop() || "").toLowerCase();
        return name.indexOf(".html") === -1 ? "index.html" : name;
    }

    function isJsDemoPage(name) {
        return name === "js-demo.html";
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function haystack(item) {
        return (item.title + " " + item.hint + " " + (item.keywords || "")).toLowerCase();
    }

    function liveShopItems() {
        const cards = document.querySelectorAll(".shopping-card");
        if (!cards.length) {
            return [];
        }
        return Array.prototype.map.call(cards, function (card) {
            const title = ((card.querySelector("h3") || {}).textContent || "Product").trim();
            const price = card.getAttribute("data-price") || "";
            const desc = Array.prototype.map.call(card.querySelectorAll("p"), function (p) {
                return p.textContent;
            }).join(" ");
            return {
                title: title,
                hint: "JavaScript · Demo 4 shopping cart" + (price ? " · $" + price : ""),
                url: "js-demo.html#product-" + title.toLowerCase().replace(/\s+/g, "-"),
                keywords: (title + " " + desc + " laptop shop cart demo 4 product").toLowerCase(),
                page: "js-demo.html",
                demo: 4,
                filter: title
            };
        });
    }

    function allItems() {
        const seen = {};
        const merged = [];
        catalog.concat(liveShopItems()).forEach(function (item) {
            const key = item.title + "|" + item.hint;
            if (seen[key]) {
                return;
            }
            seen[key] = true;
            merged.push(item);
        });
        return merged;
    }

    function itemFile(item) {
        return ((item.url || "").split("#")[0] || currentFile()).toLowerCase();
    }

    function findMatches(query) {
        const term = query.trim().toLowerCase();
        if (!term) {
            return [];
        }
        const words = term.split(/\s+/);
        const page = currentFile();
        const hits = allItems().filter(function (item) {
            const text = haystack(item);
            return words.every(function (word) {
                return text.indexOf(word) !== -1;
            });
        });

        hits.sort(function (a, b) {
            const aHere = itemFile(a) === page ? 1 : 0;
            const bHere = itemFile(b) === page ? 1 : 0;
            if (aHere !== bHere) {
                return bHere - aHere;
            }
            const aTitle = a.title.toLowerCase().indexOf(term) !== -1 ? 1 : 0;
            const bTitle = b.title.toLowerCase().indexOf(term) !== -1 ? 1 : 0;
            if (aTitle !== bTitle) {
                return bTitle - aTitle;
            }
            const aShop = a.demo === 4 ? 1 : 0;
            const bShop = b.demo === 4 ? 1 : 0;
            return bShop - aShop;
        });

        const shopHits = hits.filter(function (item) {
            return item.demo === 4;
        });
        if (shopHits.length > 1) {
            hits.unshift({
                title: shopHits.length + " matching products",
                hint: "JavaScript · Demo 4 shopping cart · show this list",
                url: "js-demo.html#demo4",
                keywords: term,
                filter: term,
                demo: 4,
                list: true
            });
        }

        return hits;
    }

    function hideResults() {
        results.hidden = true;
        results.innerHTML = "";
    }

    function closePanel() {
        panel.hidden = true;
        hideResults();
    }

    function openPanel() {
        panel.hidden = false;
        input.focus();
        if (input.value.trim()) {
            renderResults(input.value);
        }
    }

    function renderResults(query) {
        const matches = findMatches(query);

        if (!query.trim()) {
            hideResults();
            return matches;
        }

        results.hidden = false;
        results.innerHTML = "";

        if (matches.length === 0) {
            const empty = document.createElement("li");
            empty.innerHTML = '<span class="no-result">No matching products or pages.</span>';
            results.appendChild(empty);
            return matches;
        }

        matches.forEach(function (item, index) {
            const row = document.createElement("li");
            const link = document.createElement("a");
            link.href = item.url;
            link.className = index === 0 ? "active" : "";
            link.innerHTML =
                '<span class="page-label">' + escapeHtml(item.title) + "</span>" +
                '<span class="page-hint">' + escapeHtml(item.hint) + "</span>";
            link.addEventListener("click", function (event) {
                event.preventDefault();
                goToItem(item, query);
            });
            row.appendChild(link);
            results.appendChild(row);
        });

        return matches;
    }

    function goToItem(item, query) {
        const page = currentFile();
        const file = itemFile(item);
        const hash = (item.url.split("#")[1] || "");

        if (isJsDemoPage(file) && (item.list || item.demo === 4)) {
            const term = item.list ? query : (item.title || query);
            if (isJsDemoPage(page) && typeof window.applyHeaderProductFilter === "function") {
                window.applyHeaderProductFilter(term);
                closePanel();
                return;
            }
            window.location.href = "js-demo.html?q=" + encodeURIComponent(term) + "#demo4";
            return;
        }

        if (file === page) {
            if (hash) {
                window.location.hash = hash;
            }
            closePanel();
            return;
        }

        window.location.href = item.url;
    }

    trigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (panel.hidden) {
            openPanel();
        } else {
            closePanel();
        }
    });

    input.addEventListener("input", function () {
        renderResults(input.value);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const matches = findMatches(input.value);
        if (matches.length > 0) {
            goToItem(matches[0], input.value);
        } else {
            renderResults(input.value);
        }
    });

    document.addEventListener("click", function (event) {
        if (!box.contains(event.target)) {
            closePanel();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePanel();
        }
    });
})();
