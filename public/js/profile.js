$(document).ready(function () {
    displayUserDetails();
    display();
    $(".modal").modal();
    $(".tooltipped").tooltip();
    $("#profile-img-link").on("click", uploadProfileImg);
    $("#profile-img-upload").on("change", uploadProfileImgSubmit);
});

//the below function retrives the user's name and location from the database using ajax
const displayUserDetails = () => {
    const queryString = window.location.search;
    $.ajax({
        url: "/api/profile" + queryString,
        type: "GET",

        success: (result) => {
            $("#user_name").text(result.data.user);
            $("#location").text(result.data.location);
            if (result.data.profileImg) {
                $("#profile-img").attr(
                    "src",
                    `/api/profile/profileImg/${result.data.profileImg}`
                );
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
};
// the below code is to display the existing items in a
//  formatted way such as 3 items for the row, if there are more than 3 items per row it will display the item in new row
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
//the below code will define the item card which is visibe in the profile once created
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

//this below function displays all the added items to his profile page if anything is available if not it would be null 
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
//this function allows the user to select the update profile and triggers when clicked into it
function uploadProfileImg(e) {
    e.preventDefault();
    $("#profile-img-upload").trigger("click");
}
//this below function creates a form to upload the user image
function uploadProfileImgSubmit() {
    let formData = new FormData(
        document.querySelector("#profile-img-uploadFrm")
    );
//this below function updates the user profile by taking input image form the user when he clicks upload 
    $.ajax({
        url: "/api/profile/saveProfileImg",
        data: formData,
        type: "POST",
        processData: false,
        contentType: false,
        success: (result) => {
            console.log(result.message);
//used to reload the page
            location.reload(); 
        },
//if there is any error with the message it will be shown in the output
        error: (err) => {
            console.log(err.message);
        },
    });
}
