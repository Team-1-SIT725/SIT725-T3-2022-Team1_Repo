const noteSocket = io("/Notifications");

/*****************************************************************************
Function: $(document).ready
Author: Phil Williams

Purpose: jQuery Function that runs once the DOM is loaded. Initialises a number 
of materialize css components and jquery events.
*****************************************************************************/

$(document).ready(function () {
    $(".sidenav").sidenav();
    $(".autocomplete").autocomplete({
        data: { "iPhone 6s": null, "iPhone 8+": null },
        limit: 6,
    });
    // $(".autocomplete").on("input change", updateSearch);
    displayUserDetailsNav();
});

/*****************************************************************************
Function: displayUserDetailsNav
Author: Phil Williams

Purpose: Displays the user details and image on the side nave for mobile views
*****************************************************************************/
const displayUserDetailsNav = () => {
    $.ajax({
        url: "/api/profile",
        type: "GET",

        success: (result) => {
            $(".userNameUpdate").text(result.data.user);
            if (result.data.profileImg) {
                $("#side-nav-profile-img").attr(
                    "src",
                    `/api/profile/profileImg/${result.data.profileImg}`
                );
                $("#nav-profile-img").attr(
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

/*****************************************************************************
Function: updateSearch
Author: Phil Williams

Purpose: Component for autocomplete in search field. presently inactive. 
*****************************************************************************/

function updateSearch(e) {
    debugger;
    $.ajax({
        url: "/api/search",
        data: { term: e.target.value },
        type: "GET",
        success: (result) => {
            // console.log(result);
            // data = result.json();
            // data = JSON.parse(result);
            // let data = JSON.stringify(result.data);
            let data = result.data;
            console.log(data);
            data = data.map((result) => {
                return { label: result.itemName, value: result.itemName };
            });
            data = JSON.stringify(data);
            console.log(data);
            // $("#search").autocomplete("updateData", data);
            e.autocomplete("updateData", data);
        },
        error: (err) => {
            console.log(err);
        },
    });
}

/*****************************************************************************
Function: OpenSearch
Author: Phil Williams

Purpose: Places the curser in the search field when opened
*****************************************************************************/
function OpenSearch() {
    $("#searchTop").select();
}

/*****************************************************************************
Function: $(".dropdown-account").dropdown
Author: Phil Williams

Purpose: Jquery to initialise dropdown on the account button
*****************************************************************************/
$(".dropdown-account").dropdown({
    constrainWidth: false,
    coverTrigger: false,
});

/*****************************************************************************
Function: $(".dropdown-search").dropdown
Author: Phil Williams

Purpose: Jquery to initialise dropdown on the navbar search
*****************************************************************************/
$(".dropdown-search").dropdown({
    constrainWidth: false,
    coverTrigger: false,
    closeOnClick: false,
    alignment: "right",
    onOpenEnd: OpenSearch,
});

/*****************************************************************************
Function: $(".close-button").click
Author: Phil Williams

Purpose: Click event to close the search bar if the x is clicked
*****************************************************************************/
$(".close-button").click(() => {
    $(".dropdown-search").dropdown("close");
});

/*****************************************************************************
Function: $("#searchSide").on("keyup")
Author: Phil Williams

Purpose: Event listener for enter press on side search text input
redirects to the search page with entered search term
*****************************************************************************/
$("#searchSide").on("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        window.location = "/search.html?search=" + $("#searchSide").val();
    }
});

/*****************************************************************************
Function: noteSocket.on("receive-notification")
Author: Phil Williams

Purpose: This is a socket event listener when the server issues a 
receive-notification event for the current user 
*****************************************************************************/
noteSocket.on("receive-notification", (data) => {
    console.log(data);
    M.toast({ html: data }); //toast is a metalized css popup
});
