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
});

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

    for (let i = 0; i < files.length; i++) {}
};

const submitAddItem = () => {
    // let formData = document.querySelector("#addItemForm").form;
    let formData = new FormData(document.querySelector("#addItemForm"));

    // let formData = $("#addItemForm").form;
    // const formData = new FormData($("#addItemForm").target);
    // let formData = {};
    // formData.itemName = $("#itemName").val();
    // formData.itemCategory = $("#itemCategory").val();
    // formData.itemCondition = $("#itemCondition").val();
    // formData.itemDescription = $("#itemDescription").val();
    // formData.itemSize = $("#itemSize").val();
    // formData.itemColour = $("#itemColour").val();
    // formData.itemValue = $("#itemValue").val();
    // formData.files = $("input#img-upload")[0].files;
    // formData.encoding = "multipart/form-data";
    // const files = $("input#img-upload")[0].files;
    // formData.append = ("itemName", $("#itemName").value);
    // for (let i = 0; i < files.length; i++) {
    //     formData.append("files", files[i]);
    // }
    // formData.append = ("itemCategory", $("#itemName").val());
    // formData.append = ("itemCondition", $("#itemCondition").val());
    // formData.append = ("itemDescription", $("#itemDescription").val());
    // formData.append = ("itemSize", $("#itemSize").val());
    // formData.append = ("itemColour", $("#itemColour").val());
    // formData.append = ("itemValue", $("#itemValue").val());
    // formData.append = ("files", $("input#img-upload")[0].files);

    // formData.contentType = "multipart/form-data";
    // form.enctype = "multipart/form-data";
    console.log("Form Data Submitted: ", formData);
    addItemToApp(formData);
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
            alert(result.message);
            location.reload(); //used to reload the page
            // window.location = "/template.html";
        },
    });
};
