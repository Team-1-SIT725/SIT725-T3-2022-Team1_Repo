$(document).ready(function () {
    // $(".modal").modal();
    $("select").formSelect();
    // $(".collapsible").collapsible();
    $("#addFormSubmitBt").click(() => {
        submitAddItem();
    });
    // $("#addItemSubmit").click(submitForm);
    // $("input#itemName, textarea#itemDescription").characterCounter();
    // $("#img-upload").on("change", imgPreview);
});

const submitAddItem = () => {
    let formData = new FormData(document.querySelector("#addressForm"));
    console.log("Form Data Submitted: ", formData);
    addItemToApp(formData);
};
const addItemToApp = (formData) => {
    $.ajax({
        url: "/api/addressVarification/add",
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