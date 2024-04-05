const tableBody = document.getElementById('repo-table');
const fetchButton = document.getElementById('fetch-button');

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  const requestUrl = 'https://api.github.com/orgs/nodejs/repos';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // ? We use a `for...of` loop here because it's a little less code than a traditional `for` loop. We also don't need to keep track of the index `(i)`.
      for (const repo of data) {
        // Creating elements, tablerow, tabledata, and anchor
        const createTableRow = document.createElement('tr');
        const tableData = document.createElement('td');
        const link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = repo.html_url;
        link.href = repo.html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}

//fetchButton.addEventListener('click', getApi);





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
            console.log("Your search page 'Taylor Swift' exists on English Wikipedia" );
        }
    })
    .catch(function(error){console.log(error);});

}
fetchButton.addEventListener('click', getArticleApi);