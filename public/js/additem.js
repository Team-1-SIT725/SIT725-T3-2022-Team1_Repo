/*****************************************************************************
Function: $(document).ready
Author: Phil Williams

Purpose: jQuery Function that runs once the DOM is loaded. Initialises a number 
of materialize css components and jquery events.
*****************************************************************************/

$(document).ready(function () {
    $(".modal").modal();
    $("select").formSelect();
    $(".collapsible").collapsible();
    $("#addItemSubmit").click(() => {
        submitAddItem();
    });
    // $("#addItemSubmit").click(submitForm);
    $("input#itemName, textarea#itemDescription").characterCounter();
    $("#img-upload").on("change", imgPreview);
    $("#itemCondition").on("change", itemCondition);
    $("#additembtn").floatingActionButton();
});

/*****************************************************************************
Function: imgPreview
Author: Phil Williams

Purpose: This function creates the image preview on the add Item Modal
*****************************************************************************/
function imgPreview(e) {
    var files = e.target.files;
    var filesLength = files.length;
    document.querySelector("#img-upload-error").classList.add("hide");
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

/*****************************************************************************
Function: itemCondition
Author: Phil Williams

Purpose: This function checks the item condition on change and adds a hide 
for the error message if an item is selected
*****************************************************************************/
function itemCondition(e) {
    if (e.target.checkValidity()) {
        document.querySelector("#itemCondition-error").classList.add("hide");
    }
}

/*****************************************************************************
Function: removeFile
Author: Phil Williams

Purpose: Code to remove files from the img-upload input when one is deleted
presently not functional or in use.
*****************************************************************************/
const removeFile = (fileName) => {
    const dt = new DataTransfer();
    const imgUpload = $("#img-upload");
    const { files } = imgUpload;

    for (let i = 0; i < files.length; i++) {}
};

/*****************************************************************************
Function: submitAddItem
Author: Phil Williams

Purpose: Check the add item form is valid and submits it to the addItemToApp
function.
*****************************************************************************/
const submitAddItem = () => {
    //Check form is valid before submitting
    let frmValid = true;
    let fields = document.querySelector("#addItemForm").elements;

    //checks each element in the form to see if it's valid based on the conditions
    //set in the HTML
    for (i = 0; i < fields.length; i++) {
        if (!fields[i].checkValidity()) {
            frmValid = false;
            // adds invalid class it element
            fields[i].classList.add("invalid");
            //unable to used built in materialize css validation on non text fields
            //so shows or hides error message for image and item condition
            if (fields[i].id == "img-upload") {
                document
                    .querySelector("#img-upload-error")
                    .classList.remove("hide");
            } else if (fields[i].id == "itemCondition") {
                document
                    .querySelector("#itemCondition-error")
                    .classList.remove("hide");
            }
        } else {
            if (fields[i].id == "img-upload") {
                document
                    .querySelector("#img-upload-error")
                    .classList.add("hide");
            } else if (fields[i].id == "itemCondition") {
                document
                    .querySelector("#itemCondition-error")
                    .classList.add("hide");
            }
        }
    }

    if (frmValid) {
        let formData = new FormData(document.querySelector("#addItemForm"));
        console.log("Form Data Submitted: ", formData);
        addItemToApp(formData);
    }
};

/*****************************************************************************
Function: addItemToApp
Author: Phil Williams

Purpose: Uses Ajax to post the form to the /api/item/add route. As this is a 
multipart/form-data processData and contentType are disabled due to the way
ajax handles these
*****************************************************************************/
const addItemToApp = (formData) => {
    $.ajax({
        url: "/api/item/add",
        data: formData,
        type: "POST",
        processData: false,
        contentType: false,
        success: (result) => {
            console.log(result.message);
            location.reload(); //used to reload the page
        },
        error: (err) => {
            console.log(err.message);
        },
    });
};
