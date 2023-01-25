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

    $("#additembtn").floatingActionButton();
    display();
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
    let formData = new FormData(document.querySelector("#addItemForm"));

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
            console.log(result.message);
            location.reload(); //used to reload the page
            displayResults(result.data);
            // window.location = "/template.html";
        },
        error: (err) => {
            console.log(err.message);
        },
    });
};

////--------------------------//

const displayResults = (data) => {
    let html = "";
    let i = 0;
    html += `<div class="row">`;
    data.forEach((item) => {
        i++;
        //checks if number is divisable by three and adds a new row

        if (i % 3 === 0) {
            html += `${displayCard(item)}</div><div class="row">`;
        } else {
            html += displayCard(item);
        }
    });
    html += `</div>`;
    document.getElementById("display-item").innerHTML = html;
};

const displayCard = (item) => {
    let html = `
   		<div class="col s12 m4">
      		<div class="card small hoverable">
        		<div class="card-image">`;
    if (item.itemImages.length > 0) {
        html += `<img src="/api/item/itemimage/${item.itemImages[0].newFilename}">`;
    }

    html += `</div> 
        		<div class="card-content">
        			<span class="card-title">${item.itemName}</span>
        
          			<p>${item.itemDescription}</p>
        		</div>
                <div class="card-action">
                <a href="/item.html?itemID=${item._id}">View Item</a>
                </div>
      		</div>

    	</div>
`;
    return html;
};

function display() {
    $.ajax({
        url: "/api/search/user",
        type: "GET",
        success: (result) => {
            console.log(result.data);
            displayResults(result.data);
        },
        error: (err) => {
            console.log(err);
        },
    });
}
