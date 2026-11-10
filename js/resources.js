function displayResources(resources, container) {

    // Clear old resources
    container.textContent = "";

    // Show a message if no resources match
    if (resources.length === 0) {

        const message = document.createElement("p");

        message.className = "no-resources";
        message.textContent = "No matching resources found.";

        container.appendChild(message);

        return;
    }

    // Create a card for each resource
    resources.forEach(function(resource) {

        const card = document.createElement("div");
        card.className = "resource-card";

        const category = document.createElement("span");
        category.className = "category-chip";
        category.textContent = resource.category;

        const title = document.createElement("h3");
        title.textContent = resource.title;

        const subject = document.createElement("p");
        subject.className = "resource-subject";
        subject.textContent = resource.subject;

        const description = document.createElement("p");
        description.className = "resource-description";
        description.textContent = resource.description;

        card.appendChild(category);
        card.appendChild(title);
        card.appendChild(subject);
        card.appendChild(description);

        container.appendChild(card);
    });
}


// Add categories and subjects to dropdowns
function setupResourceFilters() {

    const searchInput = document.getElementById("resource-search");
    const categoryFilter = document.getElementById("category-filter");
    const subjectFilter = document.getElementById("subject-filter");
    const resourceContainer = document.getElementById("all-resources");

    const categories = [];
    const subjects = [];

    // Get unique categories and subjects
    academicResources.forEach(function(resource) {

        if (!categories.includes(resource.category)) {
            categories.push(resource.category);
        }

        if (!subjects.includes(resource.subject)) {
            subjects.push(resource.subject);
        }
    });

    // Add categories to dropdown
    categories.forEach(function(category) {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });

    // Add subjects to dropdown
    subjects.forEach(function(subject) {

        const option = document.createElement("option");

        option.value = subject;
        option.textContent = subject;

        subjectFilter.appendChild(option);
    });


    // Filter resources based on user selection
    function filterResources() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const selectedSubject = subjectFilter.value;

        const filteredResources = academicResources.filter(
            function(resource) {

                const title = resource.title.toLowerCase();
                const subject = resource.subject.toLowerCase();

                const matchesSearch =
                    title.includes(searchText) ||
                    subject.includes(searchText);

                const matchesCategory =
                    selectedCategory === "" ||
                    resource.category === selectedCategory;

                const matchesSubject =
                    selectedSubject === "" ||
                    resource.subject === selectedSubject;

                return matchesSearch &&
                    matchesCategory &&
                    matchesSubject;
            }
        );

        displayResources(filteredResources, resourceContainer);
    }


    // Listen for search and filter changes
    searchInput.addEventListener("input", filterResources);

    categoryFilter.addEventListener("change", filterResources);

    subjectFilter.addEventListener("change", filterResources);

}