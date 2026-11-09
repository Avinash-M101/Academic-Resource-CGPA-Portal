function displayResources(resources, container) {

    // Clear the old resources before displaying new ones
    container.textContent = "";

    // Show a message if there are no resources
    if (resources.length === 0) {

        const message = document.createElement("p");

        message.className = "no-resources";
        message.textContent = "No academic resources available.";

        container.appendChild(message);

        return;
    }

    // Create a card for each resource
    resources.forEach(function(resource) {

        const card = document.createElement("div");
        card.className = "resource-card";

        // Resource category
        const category = document.createElement("span");
        category.className = "category-chip";
        category.textContent = resource.category;

        // Resource title
        const title = document.createElement("h3");
        title.textContent = resource.title;

        // Subject name
        const subject = document.createElement("p");
        subject.className = "resource-subject";
        subject.textContent = resource.subject;

        // Resource description
        const description = document.createElement("p");
        description.className = "resource-description";
        description.textContent = resource.description;

        // Add all elements to the card
        card.appendChild(category);
        card.appendChild(title);
        card.appendChild(subject);
        card.appendChild(description);

        // Add the card to the main container
        container.appendChild(card);
    });
}