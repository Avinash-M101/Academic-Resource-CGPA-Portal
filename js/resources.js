// Display resources inside the given container

function displayResources(resources, container) {

    container.textContent = "";

    resources.forEach(function(resource) {

        const card = document.createElement("div");
        card.className = "resource-card";

        const category = document.createElement("span");
        category.className = "resource-category";
        category.textContent = resource.category;

        const title = document.createElement("h3");
        title.textContent = resource.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + resource.subject;

        const description = document.createElement("p");
        description.textContent = resource.description;

        card.appendChild(category);
        card.appendChild(title);
        card.appendChild(subject);
        card.appendChild(description);

        container.appendChild(card);

    });

}