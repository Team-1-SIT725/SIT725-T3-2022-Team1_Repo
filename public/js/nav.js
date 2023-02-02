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
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
};

// $(".autocomplete").on("input change", function () {
//     const instance = M.Autocomplete.getInstance(
//         document.querySelector("#search")
//     );
//     let searchTerm = this.value;
//     $.ajax({
//         url: "/api/search",
//         data: { term: searchTerm },
//         type: "GET",
//         success: (result) => {
//             debugger;
//             // console.log(result);
//             // data = result.json();
//             // data = JSON.parse(result);
//             // let data = JSON.stringify(result.data);
//             let data = result.data;
//             console.log(data);
//             data = data.map((result) => {
//                 return { label: result.itemName, value: result.itemName };
//             });
//             data = JSON.stringify(data);
//             console.log(data);
//             // instance.options.updateData(data);
//             $("#search").autocomplete({
//                 data: data,
//                 limit: 6,
//             });
//         },
//         error: (err) => {
//             console.log(err);
//         },
//     });
// });

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

// let data = await fetch(`/api/search?term=${res.term}`)
// .then((res) => res.json())
// .then((res) =>
//     res.map((res) => {
//         return {
//             label: result.itemName,
//             value: result.name,
//             id: result._id,
//         };
//     })
// );
// res(data);
// },
// minLength: 2,
// select: function (event, ui) {
// console.log(ui.item);

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
