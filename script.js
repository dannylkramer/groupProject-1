const fetchButton = document.getElementById('fetch-button');

function getAlbumApi(albumTitle) {
    const url = "https://en.wikipedia.org/w/api.php";
    const params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: albumTitle,
        format: "json",
        origin: "*"
    });
    fetch(`${url}?${params}`)
        .then(response => response.json())
        .then(response => {
            const searchResults = response.query.search;
            for (const result of searchResults) {
                if (result.title === albumTitle) {
                    const pageId = result.pageid;
                    const wikiUrl = `https://en.wikipedia.org/?curid=${pageId}`;
                    console.log(`Link to ${albumTitle} Wikipedia page:`, wikiUrl);
                    break;
                }
            }
        })
        .catch(error => console.log(error));
}

fetchButton.addEventListener('click', function() {
    getAlbumApi("Taylor Swift (album)");
    getAlbumApi("Fearless (Taylor's Version)");
    getAlbumApi("Speak Now (Taylor's Version)")
    getAlbumApi("Red (Taylor's Version)")
    getAlbumApi("1989 (Taylor's Version)")
    getAlbumApi("Reputation (album)")
    getAlbumApi("Lover (album)")
    getAlbumApi("Folklore (Taylor Swift album)")
    getAlbumApi("Evermore")
    getAlbumApi("Midnights")
});






















