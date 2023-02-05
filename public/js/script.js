
    
//this function gets the token and user id from a url and inputs it into the token and user id form field
//which is on the reset password page
    $(document).ready(function () {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const token = urlParams.get("token");
    const userId = urlParams.get("id");
        document.getElementById("token").value = token;
        document.getElementById("userId").value = userId;
      

    });