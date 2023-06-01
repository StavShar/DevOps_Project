const SERVER_ADDRESS = "http://localhost:3000/";

function table_page() {
    document.getElementById('reg-box').style.visibility = 'hidden';
    document.getElementById('reg-button').style.visibility = 'visible';
    document.getElementById('home-box').style.visibility = 'visible';
    document.getElementById('home-button').style.visibility = 'hidden';

    var jsonData = [
        { Name: "John", Age: 25, Country: "USA" },
        { Name: "Alice", Age: 30, Country: "Canada" },
        { Name: "Bob", Age: 35, Country: "UK" }
    ];

    var tableContainer = document.getElementById('table-container');
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }

    fetch(SERVER_ADDRESS + 'table')
        .then(res => res.json())
        .then(data => {
            var table = createTable(data);
            tableContainer.appendChild(table);
        })
        .catch(err => console.log(err));



    /*
    fetch(SERVER_ADDRESS + 'table')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));*/
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

function saveData() {
    var name = document.getElementById('name').value;
    var g1 = document.getElementById('grade1').value;
    var g2 = document.getElementById('grade2').value;
    var g3 = document.getElementById('grade3').value;


    const data = {
        name: name,
        grade1: g1,
        grade2: g2,
        grade3: g3
    };

    if (!(nameValidation(name) && gradeValidation(g1) && gradeValidation(g2) && gradeValidation(g3))) {
        alert('Error: One or more parameters are invalid. Please check your input and try again. ')
    }
    else {
        g1 = parseInt(g1)
        g2 = parseInt(g2)
        g3 = parseInt(g3)

        fetch(SERVER_ADDRESS + 'save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status == 400)
                    alert("This student already exist in the database")
                else {
                    alert("This student has been saved successfully")
                    document.getElementById('name').value = '';
                    document.getElementById('grade1').value = '';
                    document.getElementById('grade2').value = '';
                    document.getElementById('grade3').value = '';
                }
            })
            .then(result => {
                console.log('Response from server:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    console.log("name: " + name + ", g1: " + g1 + ", g2: " + g2 + ", g3: " + g3);
}

function nameValidation(name) {
    const regex = /^[A-Z][a-z]*$/;
    console.log('name validation result of ' + name + ' is: ' + regex.test(name));
    return regex.test(name);
}

function gradeValidation(grade) {
    var regex = /^-?\d+$/;
    if (regex.test(grade)) {
        if (grade >= 0 && grade <= 100) {
            console.log('grade validation result of ' + grade + ' is: true');
            return true;
        }
    }
    console.log('grade validation result of ' + grade + ' is: false');
    return false;
}

function createTable(data) {
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    // Create table header
    var headers = Object.keys(data[0]);
    var headerRow = document.createElement('tr');
    headers.forEach(function (header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows
    data.forEach(function (rowData) {
        var row = document.createElement('tr');
        headers.forEach(function (header) {
            var cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}
