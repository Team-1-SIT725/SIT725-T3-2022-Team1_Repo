$(document).ready(function () {
    $(".modal").modal();
    $("select").formSelect();
    $(".collapsible").collapsible();
    $("#addItemSubmit").click(() => {
        submitAddItem();
    });
    $("input#itemName, textarea#itemDescription").characterCounter();
});

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
