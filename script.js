/* ==========================
   MOBILE SIDEBAR
========================== */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
}

/* ==========================
   MODAL
========================== */

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

if (openModal && modal) {

    openModal.addEventListener("click", () => {
        modal.style.display = "flex";
    });

}

if (closeModal && modal) {

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

}

window.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }

});

/* ==========================
   ADD EMPLOYEE
========================== */

const employeeForm = document.getElementById("employeeForm");

if (employeeForm) {

    employeeForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const employee = {

            id: "EMP" + Date.now(),

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            department: document.getElementById("department").value,

            position: document.getElementById("position").value,

            employmentDate:
                document.getElementById("employmentDate").value

        };

        let employees =
            JSON.parse(localStorage.getItem("employees")) || [];

        employees.push(employee);

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        document.getElementById("successMessage").innerHTML =
            "Employee Added Successfully ✅";

        employeeForm.reset();

    });

}

/* ==========================
   DISPLAY EMPLOYEES
========================== */

const employeeGrid =
    document.getElementById("employeeGrid");

if (employeeGrid) {

    displayEmployees();

}

function displayEmployees() {

    let employees =
        JSON.parse(localStorage.getItem("employees")) || [];

    employeeGrid.innerHTML = "";

    employees.forEach((employee, index) => {

        employeeGrid.innerHTML += `

        <div class="employee-card">

            <h3>${employee.name}</h3>

            <p><strong>ID:</strong> ${employee.id}</p>

            <p>${employee.position}</p>

            <p>${employee.department}</p>

            <span class="active">
                Active
            </span>

            <br><br>

            <button onclick="editEmployee(${index})">
                Edit
            </button>

            <button onclick="deleteEmployee(${index})">
                Delete
            </button>

        </div>

        `;

    });

}

/* ==========================
   DELETE EMPLOYEE
========================== */

function deleteEmployee(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );

    if (confirmDelete) {

        let employees =
            JSON.parse(localStorage.getItem("employees")) || [];

        employees.splice(index, 1);

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        displayEmployees();

        updateDashboard();

    }

}

/* ==========================
   EDIT EMPLOYEE
========================== */

function editEmployee(index) {

    let employees =
        JSON.parse(localStorage.getItem("employees")) || [];

    const newName =
        prompt(
            "Enter New Name",
            employees[index].name
        );

    if (newName) {

        employees[index].name = newName;

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        displayEmployees();

        updateDashboard();

    }

}

/* ==========================
   SEARCH EMPLOYEE
========================== */

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const searchValue =
            this.value.toLowerCase();

        const cards =
            document.querySelectorAll(".employee-card");

        cards.forEach(card => {

            const content =
                card.innerText.toLowerCase();

            if (
                content.includes(searchValue)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/* ==========================
   DASHBOARD TABLE
========================== */

const employeeTable =
    document.getElementById("employeeTable");

if (employeeTable) {

    updateDashboard();

}

function updateDashboard() {

    let employees =
        JSON.parse(localStorage.getItem("employees")) || [];

    const employeeCount =
        document.getElementById("employeeCount");

    const activeCount =
        document.getElementById("activeCount");

    if (employeeCount) {

        employeeCount.textContent =
            employees.length;

    }

    if (activeCount) {

        activeCount.textContent =
            employees.length;

    }

    if (employeeTable) {

        employeeTable.innerHTML = "";

        employees.forEach(employee => {

            employeeTable.innerHTML += `

            <tr>

                <td>${employee.id}</td>

                <td>${employee.name}</td>

                <td>${employee.department}</td>

                <td>${employee.position}</td>

            </tr>

            `;

        });

    }

}
