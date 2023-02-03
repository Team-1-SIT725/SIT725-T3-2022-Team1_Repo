/*****************************************************************************
Function: $(document).ready
Author: Phil Williams

Purpose: jQuery Function that runs once the DOM is loaded. Runs the 
search function
*****************************************************************************/
$(document).ready(function () {
    search();
});

/*****************************************************************************
Function: search
Author: Phil Williams

Purpose: Performs search based on the search term used.
calls loadResults on success
*****************************************************************************/
function search() {
    let url;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("search");
    // Need to add stuff for Multi page
    if (searchTerm) {
        url = "api/search/term:" + searchTerm;
        // $.get(url, (response) => {
        //     if (response.statusCode == 200) {
        //         loadResults(response.data);
        //     }
        // });

        $.ajax({
            url: "/api/search",
            data: { term: searchTerm },
            type: "GET",
            success: (result) => {
                if (result.data.length > 0) {
                    console.log(result.data);
                    loadResults(result.data);
                } else {
                    document.getElementById(
                        "search-results"
                    ).innerHTML = `<h4 class="white center-align">No Results found</h4>`;
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}

/*****************************************************************************
Function: loadResults
Author: Phil Williams

Purpose: Reads the returned search results calls the addCard function to 
create item cards in rows three cards per row on large screened devices. 
Inserts these into the search results element
*****************************************************************************/
const loadResults = (data) => {
    let html = "";
    let i = 0;
    html += `<div class="row">`;
    data.forEach((item) => {
        i++;
        //checks if number is divisable by three and adds a new row

        if (i % 3 === 0) {
            html += `${addCard(item)}</div><div class="row">`;
        } else {
            html += addCard(item);
        }
    });
    html += `</div>`;
    document.getElementById("search-results").innerHTML = html;
};

/*****************************************************************************
Function: addCard
Author: Phil Williams

Purpose: This function constructs a HTMl card based on the returned search 
item and returns that HTMl element to the loadResults function.
*****************************************************************************/
const addCard = (item) => {
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
