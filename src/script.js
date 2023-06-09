const SERVER_ADDRESS = '';// devopspr0ject.azurewebsites.net/";

function createTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table header
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows
    data.forEach((rowData) => {
        const row = document.createElement('tr');
        headers.forEach((header) => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}

function table_page() {
    document.getElementById('reg-box').style.visibility = 'hidden';
    document.getElementById('reg-button').style.visibility = 'visible';
    document.getElementById('home-box').style.visibility = 'visible';
    document.getElementById('home-button').style.visibility = 'hidden';

    const tableContainer = document.getElementById('table-container');
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }

    fetch(`${SERVER_ADDRESS}table`)
        .then((res) => res.json())
        .then((data) => {
            const table = createTable(data);
            tableContainer.appendChild(table);
        })
        .catch((err) => console.log(err));
}

function reg_page() {
    document.getElementById('reg-box').style.visibility = 'visible';
    document.getElementById('reg-button').style.visibility = 'hidden';
    document.getElementById('home-box').style.visibility = 'hidden';
    document.getElementById('home-button').style.visibility = 'visible';
    document.getElementById('name').value = '';
    document.getElementById('grade1').value = '';
    document.getElementById('grade2').value = '';
    document.getElementById('grade3').value = '';
}

function nameValidation(name) {
    const regex = /^[A-Z][a-z]*[ ][A-Z][a-z]*$/;
    console.log(`name validation result of ${name} is: ${regex.test(name)}`);
    return regex.test(name);
}
function gradeValidation(grade) {
    const regex = /^-?\d+$/;
    if (regex.test(grade)) {
        if (grade >= 0 && grade <= 100) {
            console.log(`grade validation result of ${grade} is: true`);
            return true;
        }
    }
    console.log(`grade validation result of ${grade} is: false`);
    return false;
}

function saveData() {
    const name = document.getElementById('name').value;
    let g1 = document.getElementById('grade1').value;
    let g2 = document.getElementById('grade2').value;
    let g3 = document.getElementById('grade3').value;

    const data = {
        name,
        grade1: g1,
        grade2: g2,
        grade3: g3,
    };
    if (!(nameValidation(name) && gradeValidation(g1) && gradeValidation(g2)
    && gradeValidation(g3))) {
        alert('Error: One or more parameters are invalid. Please check your input and try again. ');
    } else {
        g1 = parseInt(g1);
        g2 = parseInt(g2);
        g3 = parseInt(g3);

        fetch(`${SERVER_ADDRESS}save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 400) {
                    alert('This student already exist in the database');
                } else {
                    alert('This student has been saved successfully');
                    document.getElementById('name').value = '';
                    document.getElementById('grade1').value = '';
                    document.getElementById('grade2').value = '';
                    document.getElementById('grade3').value = '';
                }
            })
            .then((result) => {
                console.log('Response from server:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    console.log(`name: ${name}, g1: ${g1}, g2: ${g2}, g3: ${g3}`);
}

try {
    module.exports = { nameValidation, gradeValidation };
} catch (e) { console.log(e); }
