$(document).ready(function () {
    $(".modal").modal();
    $("select").formSelect();
    $("#fileSubmitBt").click(() => {
        submitAddItem();
    });
});


// Post form to the route using ajax
// If success then go to login page 
// If not then print out error message
const addItemToApp = (formData) => {
    $.ajax({
        url: "/api/userProfilePrivate/add",
        data: formData,
        type: "POST",
        processData: false,
        contentType: false,
        success: (result) => {
            window.location = "/adrVar.html";
        },
        error: (err) => {
            console.log(err.message);
        },
    });
};


//This Function creates the preview images for the addItem upload.
function imgPreview(e) {
    var files = e.target.files;
    var filesLength = files.length;
    for (let i = 0; i < filesLength; i++) {
        let f = files[i];
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            let file = e.target;
            $(`<span class="pip">
               <img class="imageThumb" src="${e.target.result}" title=" ${file.name}">
               <br><a class="remove" href="#">Remove image</a></span>`).insertAfter(
                "#img-preview"
            );
            $(".remove").click(function () {
                $(this).parent(".pip").remove();
            });
        };
        fileReader.readAsDataURL(f);
    }
    console.log(files);
}

const removeFile = (fileName) => {
    const dt = new DataTransfer();
    const imgUpload = $("#img-upload");
    const { files } = imgUpload;

    for (let i = 0; i < files.length; i++) { }
};

const submitAddItem = () => {
    //Check form is valid before submitting
    let frmValid = true;
    let form = document.querySelector("#Forminput");
    let fields = document.querySelector("#Forminput").elements;

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
