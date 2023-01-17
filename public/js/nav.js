$(document).ready(function () {
    $(".sidenav").sidenav();
    $(".autocomplete").autocomplete({
        data: { "iPhone 6s": null, "iPhone 8+": null },
        limit: 6,
    });
    // $(".autocomplete").on("input change", updateSearch);
});

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

function OpenSearch() {
    $("#searchTop").select();
}

$(".dropdown-account").dropdown({
    constrainWidth: false,
    coverTrigger: false,
});
$(".dropdown-search").dropdown({
    constrainWidth: false,
    coverTrigger: false,
    closeOnClick: false,
    alignment: "right",
    onOpenEnd: OpenSearch,
});

$(".close-button").click(() => {
    $(".dropdown-search").dropdown("close");
});
