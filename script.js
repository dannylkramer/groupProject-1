const fetchButton = document.getElementById('fetch-button');

function getArticleApi() {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: "Taylor Swift",
        format: "json",
        origin: "*"
    });

    fetch(`${url}?${params}`)
        .then(function(response){return response.json();})
        .then(function(response) {
            if (response.query.search[0].title === "Taylor Swift"){
                // Extracting the pageid from the search results
                const pageId = response.query.search[0].pageid;
                // Constructing the Wikipedia page URL using the pageid
                const wikiUrl = `https://en.wikipedia.org/?curid=${pageId}`;
                console.log("Link to Taylor Swift Wikipedia page:", wikiUrl);
            }
        })
        .catch(function(error){console.log(error);});

}
fetchButton.addEventListener('click', getArticleApi);

















