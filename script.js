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
// New function for getting giphy data. The search term in the API url needs to be defined as equal to the value of the user input. We think the function has the right logic but were unable to finish.


// function getGiphyApi() {
//     const apiKey = "LTUvcpZALVfP0eEpvzvp8WlbLRs36Sl2"
//     const giphyAPI =  `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=TaylorSwift,${searchTerm}&limit=1&rating=pg`
//         fetch(giphyAPI)
//         .then(response => response.json())
        
//         .then(response => {
//             const data = response.data;
//             if (data && data.length > 0) {
//               const gifUrl = data[0].embed_url;
//               return gifUrl;
//             } else {
//               return null;
//             }
//           })
//           .catch(error => {
//             console.error(error);
//             return null;
//          });
    
//         }

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
                    if (album.toLowerCase().includes(userInput.toLowerCase())) {
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

    // We have to make sure the Giphy components (new giphy function) are simultaneously called with the wiki URL. 

    
});fetchButton.addEventListener('submit', function(event) {
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
                    // Check if the album title exactly matches the user input, ignoring case
                    if ((userInput === "debut" && album.toLowerCase() === "taylor swift (album)") ||
                        (album.toLowerCase().includes(userInput))) { // Convert album title to lowercase for comparison
                        document.getElementById('taylor-results').innerHTML = `<a href="${url}" target="_blank">${album}</a>`;
                    }
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


});

function displayLocalStorageData() {
    const storedData = localStorage.getItem('taylorSwiftAlbumUrls');
    if (storedData) {
        const albumUrls = JSON.parse(storedData);
        const userInput = document.getElementById("album-input").value.trim();
        const url = albumUrls[userInput];
        if (url) {
            document.getElementById('taylor-results').innerHTML = `<a href="${url}" target="_blank">${userInput}</a>`;
        } else {
            console.log("URL not found for input:", userInput);
        }
    } else {
        console.log("No data found in local storage.");
    }
}