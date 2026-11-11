// Get calculator elements
const subjectList = document.getElementById("subject-list");
const addSubjectButton = document.getElementById("add-subject");
const calculateButton = document.getElementById("calculate-sgpa");

const calculatorMessage = document.getElementById("calculator-message");
const sgpaResult = document.getElementById("sgpa-result");
const sgpaValue = document.getElementById("sgpa-value");
const sgpaSummary = document.getElementById("sgpa-summary");


// RTU letter grade to grade point mapping
const gradePoints = {
    "A++": 10,
    "A+": 9,
    "A": 8.5,
    "B+": 8,
    "B": 7.5,
    "C+": 7,
    "C": 6.5,
    "D+": 6,
    "D": 5.5,
    "E+": 5,
    "E": 4,
    "F": 0
};


// Function to add a subject row
function addSubjectRow() {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input
                type="text"
                class="subject-name"
                placeholder="Enter subject name"
            >
        </td>

        <td>
            <select class="subject-grade">
                <option value="">Select Grade</option>
                <option value="A++">A++</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="E+">E+</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </td>

        <td>
            <button type="button" class="remove-subject-btn">
                Remove
            </button>
        </td>
    `;

    subjectList.appendChild(row);

    // Remove subject row
    const removeButton = row.querySelector(".remove-subject-btn");

    removeButton.addEventListener("click", function () {
        row.remove();
        clearSGPAResult();
    });

    // Clear old result when subject details change
    row.querySelector(".subject-name").addEventListener("input", clearSGPAResult);
    row.querySelector(".subject-grade").addEventListener("change", clearSGPAResult);
}


// Function to clear previous result
function clearSGPAResult() {

    sgpaResult.classList.add("hidden");
    calculatorMessage.textContent = "";
}


// Add three subject rows initially
addSubjectRow();
addSubjectRow();
addSubjectRow();


// Add subject button event
addSubjectButton.addEventListener("click", function () {
    addSubjectRow();
});


// Function to calculate SGPA
function calculateSGPA() {

    const rows = subjectList.querySelectorAll("tr");

    let totalGradePoints = 0;
    let totalSubjects = 0;

    calculatorMessage.textContent = "";

    for (let row of rows) {

        const subjectName = row.querySelector(".subject-name").value.trim();
        const selectedGrade = row.querySelector(".subject-grade").value;

        if (subjectName === "" || selectedGrade === "") {
            calculatorMessage.textContent =
                "Please enter the subject name and select a grade for every row.";

            sgpaResult.classList.add("hidden");
            return;
        }

        totalGradePoints += gradePoints[selectedGrade];
        totalSubjects++;
    }

    if (totalSubjects === 0) {
        calculatorMessage.textContent =
            "Please add at least one subject.";

        sgpaResult.classList.add("hidden");
        return;
    }

    const sgpa = totalGradePoints / totalSubjects;

    sgpaValue.textContent = sgpa.toFixed(2);

    sgpaSummary.textContent =
        `Calculated using ${totalSubjects} subjects.`;

    sgpaResult.classList.remove("hidden");
}


// Calculate button event
calculateButton.addEventListener("click", calculateSGPA);