// Select dashboard elements

const totalResources = document.getElementById("total-resources");
const totalSubjects = document.getElementById("total-subjects");
const totalCategories = document.getElementById("total-categories");

const recentResources = document.getElementById("recent-resources");
const allResources = document.getElementById("all-resources");


// Update dashboard statistics

function updateDashboard() {

    const subjects = new Set(
        academicResources.map(function(resource) {
            return resource.subject;
        })
    );

    const categories = new Set(
        academicResources.map(function(resource) {
            return resource.category;
        })
    );

    totalResources.textContent = academicResources.length;
    totalSubjects.textContent = subjects.size;
    totalCategories.textContent = categories.size;

}


// Show the selected section

function showSection(sectionId) {

    const sections = document.querySelectorAll(".content-section");
    const navigationLinks = document.querySelectorAll(".nav-link");

    sections.forEach(function(section) {

        section.classList.add("hidden");

    });

    const selectedSection = document.getElementById(sectionId);

    if (!selectedSection) {
        return;
    }

    selectedSection.classList.remove("hidden");


    // Update active navigation link

    navigationLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
        }

    });

}


// Handle navigation clicks

const navigationLinks = document.querySelectorAll(".nav-link");
const quickAccessLinks = document.querySelectorAll(".quick-card");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const sectionId = this.getAttribute("href").substring(1);

        showSection(sectionId);

    });

});


// Handle quick access clicks

quickAccessLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const sectionId = this.getAttribute("href").substring(1);

        showSection(sectionId);

    });

});


// Load dashboard data

updateDashboard();

displayResources(
    academicResources.slice(0, 3),
    recentResources
);

displayResources(
    academicResources,
    allResources
);