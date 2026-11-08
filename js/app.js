// Dashboard elements
const totalResources = document.getElementById("total-resources");
const totalSubjects = document.getElementById("total-subjects");
const totalCategories = document.getElementById("total-categories");

const recentResources = document.getElementById("recent-resources");
const allResources = document.getElementById("all-resources");

const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");


// Information for each page
const pageDetails = {
    dashboard: {
        title: "Student Dashboard",
        subtitle: "Your academic overview at a glance."
    },

    resources: {
        title: "Academic Resources",
        subtitle: "Find your study materials in one place."
    },

    calculator: {
        title: "CGPA Calculator",
        subtitle: "Calculate and manage your academic results."
    },

    bookmarks: {
        title: "My Bookmarks",
        subtitle: "Access your saved academic resources."
    },

    profile: {
        title: "Student Profile",
        subtitle: "View your student information."
    }
};


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


// Show selected section
function showSection(sectionId) {

    const selectedSection = document.getElementById(sectionId);

    if (!selectedSection) {
        return;
    }

    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-link");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    selectedSection.classList.remove("hidden");

    // Update active navigation link
    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
        }
    });

    // Update page heading and description
    const currentPage = pageDetails[sectionId];

    if (currentPage) {
        pageTitle.textContent = currentPage.title;
        pageSubtitle.textContent = currentPage.subtitle;
    }
}


// Sidebar navigation
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const sectionId = link.getAttribute("href").substring(1);

        showSection(sectionId);
    });
});


// Quick access navigation
const quickAccessLinks = document.querySelectorAll(".quick-card");

quickAccessLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const sectionId = link.getAttribute("href").substring(1);

        showSection(sectionId);
    });
});


// Initial dashboard setup
updateDashboard();

displayResources(
    academicResources.slice(0, 3),
    recentResources
);

displayResources(
    academicResources,
    allResources
);