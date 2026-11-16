fetch("http://localhost:3000/users")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Nem sikerült betölteni a felhasználókat: ${response.status}`);
        }
        return response.json();
    })
    .then(users => {
        const tableBody = document.getElementById("table-body");
        users.forEach(user => {
            const row = document.createElement("tr");
            [user.id, user.name, user.email, user.city, user.phone, user.role].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));