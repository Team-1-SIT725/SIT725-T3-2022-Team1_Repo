$(document).ready(function () {
    getItem();
});

function getItem() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemID = urlParams.get("itemID");
    const url = "/api/item/view/" + itemID;
    $.get(url, (response) => {
        if (response.statusCode == 200) {
            loadItem(response.data);
        }
    });
}

const loadItem = (item) => {
    let html = `<div>
    <div class="carousel carousel-slider align-center">`;
    item.itemImages.forEach((element) => {
        html += `<img class="carousel-item img-responsive" src="/api/item/itemimage/${element.newFilename}">`;
    });
    html += `
    </div>
    <h4 class="text-bold">${item.itemName}</h4>
    <p>${item.itemDescription}</p>
    
    </div>`;

    document.getElementById("loadedItem").innerHTML = html;
    $(".carousel").carousel({
        fullWidth: false,
        indicators: true,
        duration: 2000,
    });
};
