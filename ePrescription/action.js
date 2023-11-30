
// Developed by Somesh Sarkar

var PERSONAL_DETAILS = [];
var MEDICINE_LIST = [];
var NOTE_DETAILS = [];

$(document).ready(function () {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply first name'
                    }
                }
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply last name'
                    }
                }
            },
            age: {
                validators: {
                    between: {
                        min: 1,
                        max: 110,
                        message: 'Age should be between 1 to 110'
                    },
                    notEmpty: {
                        message: 'Please supply age'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply phone number'
                    }
                }
            },
            address: {
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply street address'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'Please select gender'
                    }
                }
            },
            diagnosis: {
                validators: {
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {
            $('#alert_personal_success').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            let $form = $(e.target);

            PERSONAL_DETAILS = $form.serializeArray();
            console.log(PERSONAL_DETAILS);

        });

    $('#medicine_form').bootstrapValidator({

    }).on('success.form.bv', function (e) {
        $('#alert_medicine_success').slideDown({ opacity: "show" }, "slow")
        $('#medicine_form').data('bootstrapValidator').resetForm();

        // Prevent form submission
        e.preventDefault();

        console.log(MEDICINE_LIST);

    });

    $('#notes_form').bootstrapValidator({

    }).on('success.form.bv', function (e) {
        $('#alert_notes_success').slideDown({ opacity: "show" }, "slow")
        $('#notes_form').data('bootstrapValidator').resetForm();

        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        let $form = $(e.target);

        // Get the BootstrapValidator instance
        let bv = $form.data('bootstrapValidator');

        NOTE_DETAILS = $form.serializeArray();
        console.log(NOTE_DETAILS);

        // pass data to local storage
        var localStorageData = [PERSONAL_DETAILS, MEDICINE_LIST, NOTE_DETAILS];
        localStorage.setItem('ePresObj', JSON.stringify(localStorageData));


        //reset the form
        clearOutContactAndNotesFormField();

        // redirect to the pdf page
        let loc = window.location.pathname;
        let dir = loc.substring(0, loc.lastIndexOf('/'));

        window.location.href = dir+"/pdf.html";

    });

});


var add_more_btn = document.getElementById("add_medicine");

add_more_btn.addEventListener("click", addMoreMedicine);

function addMoreMedicine(e) {
    // Prevent form submission
    e.preventDefault();

    let medicine = document.getElementById("medicine");
    let medicine_value = medicine.value.trim();

    let dosage_schedule = document.getElementById("dosage_schedule");
    let dosage_schedule_value = dosage_schedule.options[dosage_schedule.selectedIndex].text.trim();

    let dosage_repetation = document.getElementById("dosage_repetation");
    let dosage_repetation_value = dosage_repetation.value.trim();

    if (medicine_value == "" || dosage_schedule.value < 1 || dosage_repetation_value == "") {
        $('#alert_no_medicine').slideDown({ opacity: "show" }, "slow");
    }
    else {
        console.log(medicine_value, dosage_schedule_value, dosage_repetation_value);

        $('#alert_no_medicine').hide();

        addDataToMedicineList(medicine_value, dosage_schedule_value, dosage_repetation_value);

        // clear out fields
        medicine.value = "";
        dosage_schedule.selectedIndex = 0;
        dosage_repetation.value = "";
    }
}

function addDataToMedicineList(medicine_value, dosage_schedule_value, dosage_repetation_value) {
    let medicine_list_count = MEDICINE_LIST.length;
    let medicine_to_add = {
        id: `medicine_list_td_${medicine_list_count + 1}`,
        medicine: medicine_value,
        dosage_schedule: dosage_schedule_value,
        dosage_repetation: dosage_repetation_value,
        is_delete: false
    };

    // add to array
    MEDICINE_LIST.push(medicine_to_add);

    // add to DOM
    addMedicineToDOM(medicine_to_add);
}

function addMedicineToDOM(medicine_to_add) {
    let parent_elem = document.getElementById("medicine_list_tbody");

    let tr = document.createElement("tr");
    tr.id = 'tr_' + medicine_to_add.id;

    let td1 = document.createElement("td");
    td1.innerText = medicine_to_add.medicine;

    let td2 = document.createElement("td");
    td2.innerText = medicine_to_add.dosage_schedule;

    let td3 = document.createElement("td");
    td3.innerText = medicine_to_add.dosage_repetation;

    let td4 = document.createElement("td");

    let span = document.createElement("span");
    span.id = medicine_to_add.id;
    span.classList.add("glyphicon", "glyphicon-remove-circle");
    span.style.cursor = "pointer";
    span.addEventListener("click", removeMedicineFromListOnClick);

    td4.appendChild(span);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    parent_elem.appendChild(tr);
}

function removeMedicineFromListOnClick(e) {
    let parent_elem = document.getElementById("medicine_list_tbody");

    // make is_delete property true from list
    MEDICINE_LIST[MEDICINE_LIST.findIndex((value) => value.id == e.target.id)].is_delete = true;

    // remove target child
    parent_elem.removeChild(document.getElementById("tr_" + e.target.id));

    console.log(MEDICINE_LIST);
}


function clearOutContactAndNotesFormField()
{
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").selectedIndex = 0;
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("diagnosis").value = "";
    document.getElementById("notes").value = "";
}

