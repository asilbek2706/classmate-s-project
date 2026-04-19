document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const navbar = document.getElementById("navbar");
    const adminPanel = document.getElementById("admin-panel");
    const dateInput = document.getElementById("book-date");
    const successMessage = document.getElementById("success-msg");
    const galleryIcons = {
        hair: "✂",
        nail: "💅",
        makeup: "💄",
        brow: "✨"
    };

    const setBodyLock = (isLocked) => {
        body.classList.toggle("panel-open", isLocked);
    };

    const toggleAdmin = () => {
        const isActive = adminPanel.classList.toggle("active");
        setBodyLock(isActive);
    };

    const showAdminTab = (tabName, tabButton) => {
        document.querySelectorAll(".admin-section").forEach((section) => {
            section.classList.toggle("active", section.id === `admin-${tabName}`);
        });

        document.querySelectorAll(".admin-tab").forEach((button) => {
            button.classList.toggle("active", button === tabButton);
        });
    };

    const deleteRow = (button) => {
        if (!window.confirm("O'chirishni tasdiqlaysizmi?")) {
            return;
        }

        button.closest("tr, .admin-list-item")?.remove();
    };

    const confirmBooking = (button) => {
        const badge = button.closest("tr")?.querySelector(".status-badge");
        if (!badge) {
            return;
        }

        badge.textContent = "Tasdiqlandi";
        badge.className = "status-badge status-confirmed";
        button.textContent = "✓✓";
        button.dataset.action = "done-booking";
    };

    const doneBooking = (button) => {
        const badge = button.closest("tr")?.querySelector(".status-badge");
        if (badge) {
            badge.textContent = "Bajarildi";
            badge.className = "status-badge status-done";
        }

        button.remove();
    };

    const createServiceListItem = ({ icon, name, price, premiumPrice }) => {
        const item = document.createElement("div");
        item.className = "admin-list-item";
        item.innerHTML = `
            <div>
                <span>${icon} ${name}</span><br>
                <small>${price ? `Boshlanish: ${price}` : ""}${price && premiumPrice ? " • " : ""}${premiumPrice ? `Premium: ${premiumPrice}` : ""}</small>
            </div>
            <div class="admin-actions">
                <button class="btn-edit" type="button">Tahrir</button>
                <button class="btn-del" type="button" data-action="delete-row">O'chir</button>
            </div>
        `;
        return item;
    };

    const createServiceCard = ({ icon, name, description, price, premiumPrice }) => {
        const card = document.createElement("div");
        card.className = "service-card reveal visible";
        card.innerHTML = `
            <div class="service-icon">${icon}</div>
            <h3 class="service-name">${name}</h3>
            <p class="service-desc">${description || "Yangi xizmat ma'lumotlari admin panel orqali qo'shildi."}</p>
            <div class="service-prices">
                ${price ? `<div class="price-item"><span>Boshlanish</span><strong>${price}</strong></div>` : ""}
                ${premiumPrice ? `<div class="price-item"><span>Premium</span><strong>${premiumPrice}</strong></div>` : ""}
            </div>
        `;
        return card;
    };

    const addService = () => {
        const name = document.getElementById("srv-name").value.trim();
        const icon = document.getElementById("srv-icon").value.trim() || "✦";
        const description = document.getElementById("srv-desc").value.trim();
        const price = document.getElementById("srv-price").value.trim();
        const premiumPrice = document.getElementById("srv-price2").value.trim();

        if (!name) {
            window.alert("Xizmat nomini kiriting.");
            return;
        }

        document.getElementById("services-list").appendChild(
            createServiceListItem({ icon, name, price, premiumPrice })
        );
        document.getElementById("services-grid")?.appendChild(
            createServiceCard({ icon, name, description, price, premiumPrice })
        );

        ["srv-name", "srv-icon", "srv-desc", "srv-price", "srv-price2"].forEach((id) => {
            document.getElementById(id).value = "";
        });

        window.alert("Xizmat qo'shildi.");
    };

    const createTeamListItem = ({ name, role, experience, specialty }) => {
        const item = document.createElement("div");
        item.className = "admin-list-item";
        item.innerHTML = `
            <div>
                <span>${name} — ${role}</span><br>
                <small>${experience ? `${experience} yil tajriba` : ""}${experience && specialty ? " • " : ""}${specialty || ""}</small>
            </div>
            <div class="admin-actions">
                <button class="btn-edit" type="button">Tahrir</button>
                <button class="btn-del" type="button" data-action="delete-row">O'chir</button>
            </div>
        `;
        return item;
    };

    const createTeamCard = ({ name, role, experience, initial }) => {
        const card = document.createElement("div");
        card.className = "team-card reveal visible";
        card.innerHTML = `
            <div class="team-photo">
                <div class="team-avatar">${initial}</div>
                <div class="team-overlay">
                    <p class="team-name">${name}</p>
                    <p class="team-role">${role}</p>
                    ${experience ? `<div class="team-exp"><strong>${experience}</strong><span>yil tajriba</span></div>` : ""}
                </div>
            </div>
        `;
        return card;
    };

    const addTeamMember = () => {
        const name = document.getElementById("team-name").value.trim();
        const role = document.getElementById("team-role").value.trim();
        const experience = document.getElementById("team-exp").value.trim();
        const specialty = document.getElementById("team-spec").value.trim();
        const initialValue = document.getElementById("team-initial").value.trim().toUpperCase();
        const initial = initialValue || name.charAt(0).toUpperCase();

        if (!name || !role) {
            window.alert("Ism va mutaxassislikni kiriting.");
            return;
        }

        document.getElementById("team-list").appendChild(
            createTeamListItem({ name, role, experience, specialty })
        );
        document.getElementById("team-grid")?.appendChild(
            createTeamCard({ name, role, experience, initial })
        );

        ["team-name", "team-role", "team-exp", "team-spec", "team-initial"].forEach((id) => {
            document.getElementById(id).value = "";
        });

        window.alert("Usta qo'shildi.");
    };

    const createGalleryItem = ({ title, url, category }) => {
        const item = document.createElement("div");
        const icon = galleryIcons[category] || "🖼";

        item.className = "gallery-item reveal visible";
        item.innerHTML = `
            <img class="gallery-image" src="${url}" alt="${title}">
            <div class="gallery-placeholder gallery-placeholder--overlay">
                <span>${icon}</span>
                <p>${title}</p>
            </div>
            <div class="gallery-hover" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        `;

        const image = item.querySelector(".gallery-image");
        image.addEventListener("error", () => {
            image.classList.add("gallery-image--hidden");
        });

        return item;
    };

    const addGalleryItem = () => {
        const url = document.getElementById("gallery-url").value.trim();
        const title = document.getElementById("gallery-title").value.trim() || "Ish namunasi";
        const category = document.getElementById("gallery-cat").value;

        if (!url) {
            window.alert("Rasm URL manzilini kiriting.");
            return;
        }

        document.getElementById("gallery-grid")?.appendChild(
            createGalleryItem({ title, url, category })
        );

        ["gallery-url", "gallery-title"].forEach((id) => {
            document.getElementById(id).value = "";
        });

        window.alert("Rasm qo'shildi.");
    };

    const saveContact = () => {
        window.alert("Kontakt ma'lumotlari saqlandi.");
    };

    const createBookingRow = ({ name, phone, service, master, dateLabel, rowNumber }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${String(rowNumber).padStart(3, "0")}</td>
            <td>${name}</td>
            <td>${phone}</td>
            <td>${service}</td>
            <td>${master}</td>
            <td>${dateLabel}</td>
            <td><span class="status-badge status-new">Yangi</span></td>
            <td>
                <div class="admin-actions">
                    <button class="btn-edit" type="button" data-action="confirm-booking">✓</button>
                    <button class="btn-del" type="button" data-action="delete-row">✕</button>
                </div>
            </td>
        `;
        return row;
    };

    const submitBooking = () => {
        const name = document.getElementById("book-name").value.trim();
        const phone = document.getElementById("book-phone").value.trim();
        const service = document.getElementById("book-service").value;
        const master = document.getElementById("book-master").value || "Belgilanmagan";
        const date = document.getElementById("book-date").value;
        const time = document.getElementById("book-time").value;

        if (!name || !phone || !service || !date || !time) {
            window.alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
            return;
        }

        const dateObject = new Date(`${date}T00:00:00`);
        const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
        const dateLabel = `${dateObject.getDate()} ${months[dateObject.getMonth()]}, ${time}`;
        const bookingsBody = document.getElementById("bookings-tbody");
        const rowNumber = bookingsBody.querySelectorAll("tr").length + 1;

        bookingsBody.appendChild(
            createBookingRow({ name, phone, service, master, dateLabel, rowNumber })
        );

        ["book-name", "book-phone"].forEach((id) => {
            document.getElementById(id).value = "";
        });
        document.getElementById("book-service").value = "";
        document.getElementById("book-master").value = "";
        document.getElementById("book-time").selectedIndex = 0;
        if (dateInput) {
            dateInput.value = dateInput.min;
        }

        successMessage?.classList.add("show");
        window.setTimeout(() => {
            successMessage?.classList.remove("show");
        }, 5000);
    };

    const toggleMenu = () => {
        const isOpen = navbar.classList.toggle("nav-open");
        const button = navbar.querySelector(".hamburger");
        if (button) {
            button.setAttribute("aria-expanded", String(isOpen));
        }
    };

    const closeMenu = () => {
        navbar.classList.remove("nav-open");
        navbar.querySelector(".hamburger")?.setAttribute("aria-expanded", "false");
    };

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 80);
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) {
                    return;
                }

                window.setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 80);
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(".reveal").forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        document.querySelectorAll(".reveal").forEach((element) => {
            element.classList.add("visible");
        });
    }

    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    document.addEventListener("click", (event) => {
        const tabButton = event.target.closest("[data-tab]");
        if (tabButton) {
            showAdminTab(tabButton.dataset.tab, tabButton);
            return;
        }

        const actionButton = event.target.closest("[data-action]");
        if (!actionButton) {
            return;
        }

        switch (actionButton.dataset.action) {
            case "toggle-admin":
                toggleAdmin();
                break;
            case "delete-row":
                deleteRow(actionButton);
                break;
            case "confirm-booking":
                confirmBooking(actionButton);
                break;
            case "done-booking":
                doneBooking(actionButton);
                break;
            case "add-service":
                addService();
                break;
            case "add-team-member":
                addTeamMember();
                break;
            case "add-gallery-item":
                addGalleryItem();
                break;
            case "save-contact":
                saveContact();
                break;
            case "submit-booking":
                submitBooking();
                break;
            case "toggle-menu":
                toggleMenu();
                break;
            default:
                break;
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            closeMenu();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && adminPanel.classList.contains("active")) {
            toggleAdmin();
        }
    });
});
