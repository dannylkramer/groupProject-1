


// Select necessary DOM elements
const fetchButton = document.getElementById('search-form'); // Button to trigger search
const modal = document.getElementById('modal'); // Modal element
const dismissButton = document.getElementById('dismiss-modal'); // Button to dismiss modal

// Function to fetch Wikipedia API for album information
function getAlbumApi(albumTitle) {
    // Define Wikipedia API endpoint and parameters
    const url = "https://en.wikipedia.org/w/api.php";
    const params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: albumTitle,
        format: "json",
        origin: "*"
    });
    // Fetch data from Wikipedia API
    return fetch(`${url}?${params}`)
        .then(response => response.json())
        .then(response => {
            // Extract search results from API response
            const searchResults = response.query.search;
            // Loop through search results to find matching album
            for (const result of searchResults) {
                if (result.title === albumTitle) {
                    // If album found, construct and return Wikipedia URL
                    const pageId = result.pageid;
                    const wikiUrl = `https://en.wikipedia.org/?curid=${pageId}`;
                    return wikiUrl;
                }
            }
            // Return null if album not found
            return null;
        })
        .catch(error => {
            // Log and handle errors
            console.log(error);
            return null;
        });
}

// Function to fetch Giphy API for GIF related to search term
function getGiphyApi(searchTerm) {
    // Define Giphy API endpoint and API key
    const apiKey = "LTUvcpZALVfP0eEpvzvp8WlbLRs36Sl2";
    const concatenatedSearchTerm = `Taylor Swift ${searchTerm}`;
    const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${concatenatedSearchTerm}&limit=1&rating=pg`;
    // Fetch data from Giphy API
    return fetch(giphyAPI)
        .then(response => response.json())
        .then(response => {
            // Extract GIF URL from API response
            const data = response.data;
            if (data && data.length > 0) {
                const gifUrl = data[0].images.original.url;
                return gifUrl;
            } else {
                // Return null if no GIF found
                return null;
            }
        })
        .catch(error => {
            // Log and handle errors
            console.error(error);
            return null;
        });
}

// Event listener for form submission
fetchButton.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get user input and normalize it
    let userInput = document.getElementById("album-input").value.trim().toLowerCase();

    // Mapping of user input to corresponding album titles
    const userInputToAlbum = {
        "debut": "Taylor Swift (album)",
        "fearless": "Fearless (Taylor's Version)",
        "speak now": "Speak Now (Taylor's Version)",
        "red": "Red (Taylor's Version)",
        "1989": "1989 (Taylor's Version)",
        "reputation": "Reputation (album)",
        "lover": "Lover (album)",
        "folklore": "Folklore (Taylor Swift album)",
        "evermore": "Evermore",
        "midnights": "Midnights"
    };

    // Object to store album URLs
    const albumUrls = {};

    let completedRequests = 0;
    let keywordFound = false; // Flag to check if keyword is found

    // Check if user input is in the mapping object
    if (userInput in userInputToAlbum) {
        const album = userInputToAlbum[userInput];
        // Fetch Wikipedia API for album URL
        getAlbumApi(album)
            .then(function(url) {
                if (url) {
                    // Store album URL and update DOM
                    albumUrls[album] = url;
                    document.getElementById('taylor-results').innerHTML = `<a href="${url}" target="_blank">${album}</a>`;
                    keywordFound = true; // Set flag to true if keyword is found
                } else {
                    console.log("Failed to retrieve URL for " + album + ".");
                }

                completedRequests++;

                if (completedRequests === 1) {
                    // Store album URLs in local storage after all requests are completed
                    localStorage.setItem('taylorSwiftAlbumUrls', JSON.stringify(albumUrls));
                    console.log("Album URLs stored in local storage:", albumUrls);
                    // Show alert if keyword is found
                    if (keywordFound) {
                        document.getElementById('alert-text').innerText = `Nice! You found Taylor's ${userInput} wiki article!`;
                        document.getElementById('alert').classList.remove('hidden');
                        setTimeout(function() {
                            // Hide alert after 5 seconds
                            document.getElementById('alert').classList.add('hidden');
                        }, 5000);
                    }
                }
            })
            .catch(function(error) {
                // Log and handle errors
                console.log(error);
            });
    } else {
        console.log("Invalid input.");
    }

    // Fetch Giphy API for the GIF
    getGiphyApi(userInput)
        .then(function(url) {
            if (url) {
                // Display the GIF
                document.getElementById('gif-container').innerHTML = `<img src="${url}" alt="GIF" width="480" height="270">`;
            } else {
                console.log("Failed to retrieve GIF for " + userInput + ".");
            }
        })
        .catch(function(error) {
            // Log and handle errors
            console.log(error);
        });
});
