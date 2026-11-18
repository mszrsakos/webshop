fetch("http://localhost:3000/products")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Nem sikerült betölteni a termékeket: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        const productList = document.getElementById("product-list");
        productList.replaceChildren();

        products.forEach(product => {
            const column = document.createElement("div");
            column.className = "col-12 col-md-6 col-lg-4";

            const card = document.createElement("div");
            card.className = "card h-100 shadow-sm";

            if (product.image) {
                const image = document.createElement("img");
                image.src = product.image;
                image.alt = product.name;
                image.className = "card-img-top product-image";
                card.appendChild(image);
            }

            const cardBody = document.createElement("div");
            cardBody.className = "card-body d-flex flex-column";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = product.name;

            const manufacturer = document.createElement("p");
            manufacturer.className = "text-muted mb-1";
            manufacturer.textContent = `${product.manufacturer?.name ?? ""}${product.manufacturer?.country ? ` • ${product.manufacturer.country}` : ""}`;

            const price = document.createElement("p");
            price.className = "fs-5 fw-bold text-primary mb-2";
            price.textContent = `${product.price?.toLocaleString("hu-HU") ?? "0"} Ft`;

            const details = document.createElement("p");
            details.className = "mb-2";
            details.textContent = `Készleten: ${product.stock ?? 0} db • Értékelés: ${product.rating ?? "-"}/5`;

            const features = document.createElement("ul");
            features.className = "mb-3";


            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-sm btn-danger";
            deleteButton.textContent = "Törlés";
            deleteButton.addEventListener("click", () => deleteProduct(product.id));


            if (product.features && typeof product.features === "object") {
                Object.entries(product.features).forEach(([key, value]) => {
                    const item = document.createElement("li");
                    item.textContent = `${key}: ${value}`;
                    features.appendChild(item);
                });
            }

            cardBody.append(title, manufacturer, price, details, features, deleteButton);
            card.appendChild(cardBody);
            column.appendChild(card);
            productList.appendChild(column);
        });
    })
    .catch(error => {
        console.error(error);
        const productList = document.getElementById("product-list");
        productList.textContent = "Nem sikerült betölteni a termékeket.";
    });


function submitUserForm(event) {
    const features = [];
    features[0] = document.getElementById("cpu").value;     
    features[1] = document.getElementById("ram").value;     
    features[2] = document.getElementById("storage").value; 
    features[3] = document.getElementById("gpu").value;     
    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
            rating: document.getElementById("rating").value,
            manufacturer:{
                name:document.getElementById("manuf-name").value,
                country:document.getElementById("manuf-country").value
            },
            image: document.getElementById("img").value,
            features:features

        })
    })

    .then(response => {
        if (!response.ok) {
            throw new Error(`Nem sikerült elküldeni a felhasználót: ${response.status}`);
        }
    })
    .then(() => window.location.reload())
    .catch(error => console.error(error));
}

function deleteProduct(productId) {
    fetch("http://localhost:3000/products/" + productId, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Nem sikerült törölni a felhasználót: ${response.status}`);
        }
    })
    .then(() => window.location.reload())
    .catch(error => console.error(error));
}