$(document).ready(function () {
    displayUserDetails();
    display();
    $(".modal").modal();
});

const displayUserDetails = () => {
    const queryString = window.location.search;
    $.ajax({
        url: "/api/profile" + queryString,
        type: "GET",

        success: (result) => {
            $("#user_name").text(result.data.user);
            $("#location").text(result.data.location);
        },
        error: (err) => {
            console.log(err);
        },
    });
};

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
    const queryString = window.location.search;
    $.ajax({
        url: "/api/profile/items" + queryString,
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
