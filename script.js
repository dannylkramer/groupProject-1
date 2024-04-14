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

function getGiphyApi(searchTerm) {
    const apiKey = "LTUvcpZALVfP0eEpvzvp8WlbLRs36Sl2";
    const concatenatedSearchTerm = `Taylor Swift ${searchTerm}`;
    const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${concatenatedSearchTerm}&limit=1&rating=pg`;
    return fetch(giphyAPI)
        .then(response => response.json())
        .then(response => {
            const data = response.data;
            if (data && data.length > 0) {
                const gifUrl = data[0].images.original.url; // Use images.original.url instead of embed_url
                return gifUrl;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

fetchButton.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    let userInput = document.getElementById("album-input").value.trim();

    const albums = [
        "Taylor Swift (album)",
        "Fearless (Taylor's Version)",
        "Speak Now (Taylor's Version)",
        "Red (Taylor's Version)",
        "1989 (Taylor's Version)",
        "Reputation (album)",
        "Lover",
        "Folklore (Taylor Swift album)",
        "Evermore",
        "Midnights"
    ];

    const albumUrls = {};

    let completedRequests = 0;

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
        getAlbumApi(album)
            .then(function(url) {
                if (url) {
                    albumUrls[album] = url;
                    if ((userInput === "debut" && album.toLowerCase() === "taylor swift (album)") ||
                        (album.toLowerCase().includes(userInput))) {
                        document.getElementById('taylor-results').innerHTML = `<a href="${url}" target="_blank">${album}</a>`;
                    }
                } else {
                    console.log("Failed to retrieve URL for " + album + ".");
                }

                completedRequests++;

                if (completedRequests === albums.length) {
                    // Store album URLs in local storage
                    localStorage.setItem('taylorSwiftAlbumUrls', JSON.stringify(albumUrls));
                    console.log("Album URLs stored in local storage:", albumUrls);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // Fetch Giphy API for the GIF
    getGiphyApi(userInput)
        .then(function(url) {
            if (url) {
                // Display the GIF directly
                document.getElementById('gif-container').innerHTML = `<img src="${url}" alt="GIF" width="480" height="270">`;
            } else {
                console.log("Failed to retrieve GIF for " + userInput + ".");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});