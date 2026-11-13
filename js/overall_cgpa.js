// Get CGPA calculator elements
const semesterList = document.getElementById("semester-list");
const addSemesterButton = document.getElementById("add-semester");
const calculateCGPAButton = document.getElementById("calculate-cgpa");

const cgpaMessage = document.getElementById("cgpa-message");
const cgpaResult = document.getElementById("cgpa-result");
const cgpaValue = document.getElementById("cgpa-value");
const cgpaSummary = document.getElementById("cgpa-summary");


// Function to add a semester row
function addSemesterRow() {

    const currentSemesters = semesterList.querySelectorAll(".semester-row").length;

    if (currentSemesters >= 8) {
        cgpaMessage.textContent = "You can add a maximum of 8 semesters.";
        return;
    }

    const semesterNumber = currentSemesters + 1;

    const row = document.createElement("div");

    row.className = "semester-row";

    row.innerHTML = `
        <label>
            Semester ${semesterNumber}
        </label>

        <input
            type="number"
            class="semester-sgpa"
            placeholder="Enter SGPA (0 - 10)"
            min="0"
            max="10"
            step="0.01"
        >

        <button type="button" class="remove-subject-btn">
            Remove
        </button>
    `;

    semesterList.appendChild(row);
    clearCGPAResult();
    // Remove semester row
    const removeButton = row.querySelector(".remove-subject-btn");

    removeButton.addEventListener("click", function () {

        row.remove();

        updateSemesterNumbers();
        clearCGPAResult();

    });

    // Clear old result when SGPA changes
    row.querySelector(".semester-sgpa").addEventListener("input", clearCGPAResult);

    cgpaMessage.textContent = "";
}


// Function to update semester numbers
function updateSemesterNumbers() {

    const rows = semesterList.querySelectorAll(".semester-row");

    rows.forEach(function (row, index) {

        row.querySelector("label").textContent =
            `Semester ${index + 1}`;

    });

}


// Function to clear previous result
function clearCGPAResult() {

    cgpaResult.classList.add("hidden");
    cgpaMessage.textContent = "";

}


// Add two semester rows initially
addSemesterRow();
addSemesterRow();


// Add semester button event
addSemesterButton.addEventListener("click", function () {

    addSemesterRow();

});


// Function to calculate CGPA
function calculateCGPA() {

    const rows = semesterList.querySelectorAll(".semester-row");

    let totalSGPA = 0;
    let totalSemesters = 0;

    cgpaMessage.textContent = "";

    if (rows.length === 0) {

        cgpaMessage.textContent =
            "Please add at least one semester.";

        cgpaResult.classList.add("hidden");
        return;

    }

    for (let row of rows) {

        const sgpaInput = row.querySelector(".semester-sgpa").value;

        if (sgpaInput.trim() === "") {

            cgpaMessage.textContent =
                "Please enter SGPA for every semester.";

            cgpaResult.classList.add("hidden");
            return;

        }

        const sgpa = Number(sgpaInput);

        if (!Number.isFinite(sgpa) || sgpa < 0 || sgpa > 10) {

            cgpaMessage.textContent =
                "Please enter a valid SGPA between 0 and 10.";

            cgpaResult.classList.add("hidden");
            return;

        }

        totalSGPA += sgpa;
        totalSemesters++;

    }

    const cgpa = totalSGPA / totalSemesters;

    cgpaValue.textContent = cgpa.toFixed(2);

    cgpaSummary.textContent =
        `Calculated using ${totalSemesters} semesters.`;

    cgpaResult.classList.remove("hidden");

}


// Calculate button event
calculateCGPAButton.addEventListener("click", calculateCGPA);