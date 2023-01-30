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

//This Function creates the preview images for the addItem upload.
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

function itemCondition(e) {
    if (e.target.checkValidity()) {
        document.querySelector("#itemCondition-error").classList.add("hide");
    }
}

const removeFile = (fileName) => {
    const dt = new DataTransfer();
    const imgUpload = $("#img-upload");
    const { files } = imgUpload;

    for (let i = 0; i < files.length; i++) {}
};

const submitAddItem = () => {
    //Check form is valid before submitting
    let frmValid = true;
    let fields = document.querySelector("#addItemForm").elements;

    for (i = 0; i < fields.length; i++) {
        if (!fields[i].checkValidity()) {
            frmValid = false;
            fields[i].classList.add("invalid");
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

//ajax
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
            // displayResults(result.data);
            // window.location = "/template.html";
        },
        error: (err) => {
            console.log(err.message);
        },
    });
};
