
// Developed by Somesh Sarkar

$(document).ready(function () {

    var myData = JSON.parse(localStorage.getItem('ePresObj'));
    //localStorage.removeItem('ePresObj'); // Clear the localStorage

    var PERSONAL_DETAILS = myData[0];
    var MEDICINE_LIST = myData[1];
    var NOTE_DETAILS = myData[2];

    console.log(PERSONAL_DETAILS);
    console.log(MEDICINE_LIST);
    console.log(NOTE_DETAILS);

    var MAPPED_MEDICINE_LIST = [];

    // mapping for presentation
    MEDICINE_LIST.forEach(function (obj) {
        if (obj.is_delete == false) {
            MAPPED_MEDICINE_LIST.push({
                'Prescribed Medicines': obj.medicine,
                'Dosage Schedule': obj.dosage_schedule,
                'Dosage Repetation': obj.dosage_repetation
            });
        }

    })

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    // change the title
    document.getElementById('title').innerText = `${PERSONAL_DETAILS[0].value}_${PERSONAL_DETAILS[1].value}_${currentDate}`;

    // change data to DOM
    document.getElementById('patient_name').innerText = PERSONAL_DETAILS[0].value + " " + PERSONAL_DETAILS[1].value;
    document.getElementById('patient_age').innerText = PERSONAL_DETAILS[2].value;
    document.getElementById('patient_gender').innerText = PERSONAL_DETAILS[3].value;
    document.getElementById('patient_no').innerText = PERSONAL_DETAILS[4].value;
    let address = PERSONAL_DETAILS[5].value;
    document.getElementById('patient_diagnosis').innerText = PERSONAL_DETAILS[6].value;
    document.getElementById('patient_date').innerText = currentDate;

    if (MAPPED_MEDICINE_LIST != null) {
        convertJSONDataToHTMLTable(MAPPED_MEDICINE_LIST);
    }

    document.getElementById('patient_notes').innerText = (NOTE_DETAILS[0] == null || NOTE_DETAILS[0].value == '') ? 'NA' : NOTE_DETAILS[0].value;

});



function convertJSONDataToHTMLTable(jsonData) {

    // Get the container element where the table will be inserted
    let container = document.getElementById("medicine_table");

    // Create the table element
    let table = document.createElement("table");
    table.classList.add('table', 'table-bordered', 'table-hover');

    // Get the keys (column names) of the first object in the JSON data
    let cols = Object.keys(jsonData[0]);

    // Create the header element
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    // Loop through the column names and create header cells
    cols.forEach((item) => {
        let th = document.createElement("td");
        th.innerText = item; // Set the column name as the text of the header cell
        tr.appendChild(th); // Append the header cell to the header row
    });
    thead.appendChild(tr); // Append the header row to the header
    table.append(thead) // Append the header to the table

    let tbody = document.createElement("tbody");

    // Loop through the JSON data and create table rows
    jsonData.forEach((item) => {
        let tr = document.createElement("tr");

        // Get the values of the current object in the JSON data
        let vals = Object.values(item);

        // Loop through the values and create table cells
        vals.forEach((elem) => {
            let td = document.createElement("td");
            td.classList.add('bold');
            td.innerText = elem; // Set the value as the text of the table cell
            tr.appendChild(td); // Append the table cell to the table row
        });

        tbody.appendChild(tr);
    });

    table.appendChild(tbody); // Append the table row to the table
    container.appendChild(table) // Append the table to the container element
}

function openPrintPDFWindow() {
    $('#save_pdf').hide();
    $('#generate_another_btn').hide();

    window.print();
}

function openGeneratePrescriptionWindow() {
    // redirect to the pdf page
    let loc = window.location.pathname;
    let dir = loc.substring(0, loc.lastIndexOf('/'));

    window.location.href = dir+"/main.html";
}


// handling closing of the print window
window.addEventListener("afterprint", (event) => {
    $('#save_pdf').show();
    $('#generate_another_btn').show();
});

// warning not to go back
//window.onbeforeunload = function() { return "To create new prescription, please use the corresponding button."; };


