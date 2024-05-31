document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const loginForm = document.getElementById("login-form");
    const mainApp = document.getElementById("main-app");
    const loginPage = document.getElementById("login");
    const addOrderBtn = document.getElementById("add-order-btn");
    const saleOrderModal = document.getElementById("sale-order-modal");
    const closeSaleOrderModal = saleOrderModal.querySelector(".close-modal");
    const saleOrderForm = document.getElementById("sale-order-form");
    const editOrderModals = document.querySelectorAll(".edit-order-btn");
    const editOrderModal = document.getElementById("edit-order-modal");
    const closeEditOrderModal = editOrderModal.querySelector(".close-modal");
    const editOrderForm = document.getElementById("edit-order-form");
    const activeOrdersTab = document.getElementById("active-orders-tab");
    const completedOrdersTab = document.getElementById("completed-orders-tab");
    const activeOrdersContent = document.getElementById("active-orders");
    const completedOrdersContent = document.getElementById("completed-orders");
    const activeOrdersTableBody = document.getElementById("active-orders-table").querySelector("tbody");
    const completedOrdersTableBody = document.getElementById("completed-orders-table").querySelector("tbody");

    let activeOrders = [];
    let completedOrders = [];
    let editingOrderIndex = null;

    // Function to toggle dark theme
    function toggleDarkTheme() {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("dark-theme", document.body.classList.contains("dark-theme"));
    }

    // Check for saved theme preference
    if (localStorage.getItem("dark-theme") === "true") {
        document.body.classList.add("dark-theme");
        themeToggle.checked = true;
    }

    // Event listener for dark theme toggle
    themeToggle.addEventListener("change", toggleDarkTheme);

    // Function to show a specific tab
    function showTab(tab) {
        activeOrdersContent.style.display = tab === "active" ? "block" : "none";
        completedOrdersContent.style.display = tab === "completed" ? "block" : "none";
        activeOrdersTab.classList.toggle("active", tab === "active");
        completedOrdersTab.classList.toggle("active", tab === "completed");
    }

    // Event listeners for tab navigation
    activeOrdersTab.addEventListener("click", () => showTab("active"));
    completedOrdersTab.addEventListener("click", () => showTab("completed"));

    // Function to render the orders
    function renderOrders() {
        activeOrdersTableBody.innerHTML = "";
        completedOrdersTableBody.innerHTML = "";

        activeOrders.forEach((order, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td><button class="edit-order-btn" data-index="${index}">...</button></td>
            `;
            activeOrdersTableBody.appendChild(row);
        });

        completedOrders.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
            `;
            completedOrdersTableBody.appendChild(row);
        });

        // Attach event listeners to edit buttons
        document.querySelectorAll(".edit-order-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                openEditOrderModal(index);
            });
        });
    }

    // Show sale order modal
    addOrderBtn.addEventListener("click", () => {
        saleOrderModal.style.display = "block";
    });

    // Close sale order modal
    closeSaleOrderModal.addEventListener("click", () => {
        saleOrderModal.style.display = "none";
    });

    // Show edit order modal
    function openEditOrderModal(index) {
        editingOrderIndex = index;
        const order = activeOrders[index];
        document.getElementById("edit-customer-name").value = order.customerName;
        document.getElementById("edit-product").value = order.product;
        document.getElementById("edit-quantity").value = order.quantity;
        editOrderModal.style.display = "block";
    }

    // Close edit order modal
    closeEditOrderModal.addEventListener("click", () => {
        editOrderModal.style.display = "none";
    });

    // Login form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        // Dummy authentication (replace with real authentication logic)
        if (username === "admin" && password === "00") {
            loginPage.style.display = "none";
            mainApp.style.display = "block";
        } else {
            alert("Invalid username or password");
        }
    });

    // Sale order form submission
    saleOrderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const order = {
            id: Date.now().toString(),
            customerName: document.getElementById("customer-name").value,
            product: document.getElementById("product").value,
            quantity: document.getElementById("quantity").value
        };
        activeOrders.push(order);
        saleOrderModal.style.display = "none";
        saleOrderForm.reset();
        renderOrders();
    });

    // Edit order form submission
    editOrderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (editingOrderIndex !== null) {
            const order = activeOrders[editingOrderIndex];
            order.customerName = document.getElementById("edit-customer-name").value;
            order.product = document.getElementById("edit-product").value;
            order.quantity = document.getElementById("edit-quantity").value;
            editingOrderIndex = null;
            editOrderModal.style.display = "none";
            renderOrders();
        }
    });

    // Initial tab setup
    showTab("active");
});
