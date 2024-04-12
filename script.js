const fetchButton = document.getElementById('search-form');

function getAlbumApi(albumTitle) {
    const url = "https://en.wikipedia.org/w/api.php";
    const params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: albumTitle,
        format: "json",
        origin: "*"
    });
    return fetch(`${url}?${params}`)
        .then(response => response.json())
        .then(response => {
            const searchResults = response.query.search;
            for (const result of searchResults) {
                if (result.title === albumTitle) {
                    const pageId = result.pageid;
                    const wikiUrl = `https://en.wikipedia.org/?curid=${pageId}`;
                    return wikiUrl;
                }
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        });
}

fetchButton.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    let userInput = document.getElementById("album-input").value.trim();

    // Check if the user input matches the word bank
    if (
        userInput !== "Debut" &&
        userInput !== "Fearless" &&
        userInput !== "Speak Now" &&
        userInput !== "Red" &&
        userInput !== "1989" &&
        userInput !== "Reputation" &&
        userInput !== "Lover" &&
        userInput !== "Folklore" &&
        userInput !== "Evermore" &&
        userInput !== "Midnights"
    ) {
        console.log("That's not one of Taylor's albums. Try again swiftie!");
        return;
    }

    const albums = [
        "Taylor Swift (album)",
        "Fearless (Taylor's Version)",
        "Speak Now (Taylor's Version)",
        "Red (Taylor's Version)",
        "1989 (Taylor's Version)",
        "Reputation (album)",
        "Lover (album)",
        "Folklore (Taylor Swift album)",
        "Evermore",
        "Midnights"
    ];

    const albumUrls = {};

    let completedRequests = 0;

    albums.forEach((album, index) => {
        getAlbumApi(album)
            .then(url => {
                if (url) {
                    albumUrls[album] = url;
                } else {
                    console.log(`Failed to retrieve URL for ${album}.`);
                }

                completedRequests++;

                if (completedRequests === albums.length) {
                    // Store album URLs in local storage
                    localStorage.setItem('taylorSwiftAlbumUrls', JSON.stringify(albumUrls));
                    console.log("Album URLs stored in local storage:", albumUrls);
                }
            })
            .catch(error => console.log(error));
    });
});


















