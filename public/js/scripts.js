$(document).ready(function () {
    $(".modal").modal();
    $("select").formSelect();
    $(".collapsible").collapsible();
    $("#addItemSubmit").click(() => {
        submitAddItem();
    });
    $("input#itemName, textarea#itemDescription").characterCounter();
    $("#img-upload").on("change", imgPreview);
});

//This Function creates the preview images for the addItem upload.
function imgPreview(e) {
    let files = e.target.files,
        filesLength = files.length;
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

const submitAddItem = () => {
    let formData = {};
    formData.itemName = $("#itemName").val();
    formData.itemCategory = $("#itemCategory").val();
    formData.itemCondition = $("#itemCondition").val();
    formData.itemDescription = $("#itemDescription").val();
    formData.itemSize = $("#itemSize").val();
    formData.itemColour = $("#itemColour").val();
    formData.itemValue = $("#itemValue").val();

    console.log("Form Data Submitted: ", formData);
    addItemToApp(formData);
};

//ajax
const addItemToApp = (project) => {
    $.ajax({
        url: "/api/item",
        data: project,
        type: "POST",
        success: (result) => {
            alert(result.message);
            location.reload(); //used to reload the page
        },
    });
};
