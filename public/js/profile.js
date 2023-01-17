$(document).ready(function () {
    $.ajax({
        url: "/api/profile",
        type: "GET",
        
        success: (result) => {
          $("#user_name").text(result.user);
          $("#location").text(result.location);
        }
    });
});

