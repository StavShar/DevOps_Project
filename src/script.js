
function home_page() {
    document.getElementById('reg-box').style.visibility = 'hidden';
    document.getElementById('reg-button').style.visibility = 'visible';
    document.getElementById('home-box').style.visibility = 'visible';
    document.getElementById('home-button').style.visibility = 'hidden';
}

function reg_page() {
    document.getElementById('reg-box').style.visibility = 'visible';
    document.getElementById('reg-button').style.visibility = 'hidden';
    document.getElementById('home-box').style.visibility = 'hidden';
    document.getElementById('home-button').style.visibility = 'visible';
}

function save() {
    var name = document.getElementById('name').value;
    var g1 = document.getElementById('grade1').value;
    var g2 = document.getElementById('grade2').value;
    var g3 = document.getElementById('grade3').value;

    console.log("name: " + name + ", g1: " + g1 + ", g2: " + g2 + ", g3: " + g3);
}

function nameValidation(name) {
    const regex = /^[A-Z][a-z]* [A-Z][a-z]*$/;
    return regex.test(name);
}

function gradeValidation(grade) {
    return (grade >= 0 && grade <= 100);
}