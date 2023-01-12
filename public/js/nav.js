$(document).ready(function () {
    $(".sidenav").sidenav();
    $("#search").autocomplete({
        source: async function (req, res) {
            let data = await fetch(`/api/search?term=${res.term}`)
                .then((res) => res.json())
                .then((res) =>
                    res.map((res) => {
                        return {
                            label: result.itemName,
                            value: result.name,
                            id: result._id,
                        };
                    })
                );
            res(data);
        },
        minLength: 2,
        select: function (event, ui) {
            console.log(ui.item);
        },
    });
});

function OpenSearch() {
    $("#search").select();
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
