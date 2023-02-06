
$(document).ready(function () {
    $("select").formSelect();
    $("#addFormSubmitBt").click(() => {
        submitAddItem();
    });
});

const submitAddItem = () => {

    //Check form is valid before submitting
    let frmValid = true;
    let form = document.querySelector("#addressForm");
    let fields = document.querySelector("#addressForm").elements;

    //checks each element in the form to see if it's valid based on the conditions
    //set in the HTML
    for (i = 0; i < fields.length; i++) {
        if (!fields[i].checkValidity()) {
            frmValid = false;
            // adds invalid class it element
            fields[i].classList.add("invalid");
        }
    }
    if (frmValid) {
        let formData = new FormData(form);
        console.log("Form Data Submitted: ", formData);
        addItemToApp(formData);
    }
};

// Post form to the route using ajax
// If success then go to login page 
// If not then print out error message
const addItemToApp = (formData) => {
    $.ajax({
        url: "/api/addressVarification/add",
        data: formData,
        type: "POST",
        processData: false,
        contentType: false,
        success: (result) => {
            window.location = "/login.html";
        },
        error: (err) => {
            console.log(err.message);
        },
    });
};

