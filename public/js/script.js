
    

    $(document).ready(function () {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const token = urlParams.get("token");
    const userId = urlParams.get("id");
        document.getElementById("token").value = token;
        document.getElementById("userId").value = userId;
        // ${"#token"}.val(token);
        // ${"#userId"}.val(userId);

    });