$(document).ready(function () {
  $(".sidenav").sidenav();
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
