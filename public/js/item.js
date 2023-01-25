$(document).ready(function () {
    getItem();
    $(".modal").modal();
    $("select").formSelect();
});

//query DB and get item based on ID in URL
function getItem() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemID = urlParams.get("itemID");
    const url = "/api/item/view/" + itemID;
    $.get(url, (response) => {
        if (response.statusCode === 200) {
            console.log(response);
            console.log(response.data);
            loadItem(response.data);
        } else if (response.statusCode === 400) {
            html = `<h4 class="text-bold">Item not found</h4>`;
            document.getElementById("loadedItem").innerHTML = html;
        } else {
            console.log(response.message);
        }
    });
}

const loadItem = (item) => {
    //html to dynamically load item
    let html = `<div class="row">
    <div class="carousel carousel-slider align-center" data-indicators="true">`;
    item.itemImages.forEach((element) => {
        html += `<img class="carousel-item img-responsive" src="/api/item/itemimage/${element.newFilename}">`;
    });
    html += "</div>";

    html += `
    <div class="row">
    <div class="col s12 m6 offset-m3">

        <div class="card">
            <div class="card-image">`;

    if (item.itemAvailability === "Available") {
        html += `<div class="btn  green darken-1" id="availabilityFlag">Available</div>`;
    } else {
        html += `<div class="btn disabled">${item.itemAvailability}</div>`;
    }

    html += `<a href="chat.html" class="btn-floating btn-large halfway-fab waves-effect waves-light"><i class="material-icons">message</i></a>
            </div>

            <span class="card-title col s12">${item.itemName}</span>
            <div class="card-content">
                <div class = "row">

                    <div class = "col s12"><b>Posted by: </b> <a href="/profile.html?userID=${item.userID}">${item.postingUserName}</a></div>       
                    <div class = "col s12 m6"><b>Condition: </b>${item.itemCondition}</div>
                    <div class = "col s12 m6"><b>Category: </b>${item.itemCategory}</div>
                    <div class = "col s12"><b>Description: </b> <br> ${item.itemDescription}</div>
                </>
                `;

    if (item.itemColour != "") {
        html += `<div class = "col s12"><b>Colour: </b>${item.itemColour}</div>`;
    }
    if (item.itemSize != "") {
        html += `<div class = "col s12"><b>Size:"</b>${item.itemSize}</div>`;
    }

    html += `
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById("loadedItem").innerHTML = html;

    //show user controls if current user owns item
    if (item.sameUser) {
        $(".user-buttons").css("visibility", "visible");
    }
    //Set Update availability drop down to current value in DB ************** Come back an look at this only updating once you click on it.
    $(`#itemAvailability option[value=${item.itemAvailability}]`).attr(
        "selected",
        "selected"
    );
    //Initialise image carousel and config
    $(".carousel").carousel({
        fullWidth: false,
        indicators: true,
        duration: 200,
    });

    //function set to auto play materlizedcss carousel
    var carousel_interval = 3000;
    var int;
    function run() {
        int = setInterval(function () {
            $(".carousel").carousel("next");
        }, carousel_interval);
    }
    function stop() {
        clearInterval(int);
    }
    $(".carousel").hover(stop, run);
};

const deleteItem = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemID = urlParams.get("itemID");
    $.ajax({
        url: "/api/item/delete/" + itemID,
        type: "POST",
        success: (result) => {
            console.log(result.message);
            let html = `<h4 class="text-bold h4 centre-align">${result.message}</h4>
            <h5 class = "h5 centre-align">Redirecting to profile in <span id="countdown">5</span></h5>
            `;
            document.getElementById("redirectPopupContent").innerHTML = html;
            $("#redirectPopup").modal("open");
            countDown();
        },
        error: (err) => {
            console.log(err);
        },
    });
};

//Redirect to profile page once
let countDownSeconds = 7;
function countDown() {
    countDownSeconds -= 1;
    if (countDownSeconds < 0) {
        window.location = "/profile.html";
    } else {
        document.getElementById("countdown").innerHTML = countDownSeconds;
        window.setTimeout("countDown()", 1000);
    }
}

const updateAvailability = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemID = urlParams.get("itemID");
    const status = $(`#itemAvailability`).val();
    const url = "/api/item/updateavailability/" + itemID + "/" + status;
    $.post(url, (response) => {
        if (response.statusCode === 200) {
            console.log(response);
            location.reload();
        } else {
            console.log(response);
        }
    });
};
