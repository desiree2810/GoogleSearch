const apiKey = 'AIzaSyAP3a7hKUeYlAQ3kIFwZcQ3QpJ14CMXXyQ';
const cx = '11acff118d3e5447c';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query.trim() !== '') {
        searchGoogle(query);
    }
});

function searchGoogle(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error(error);
        });
}

function displayResults(results) {
    searchResults.innerHTML = '';

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');

        const title = document.createElement('div');
        title.classList.add('result-title');
        title.textContent = result.title;

        const link = document.createElement('a');
        link.classList.add('result-link');
        link.href = result.link;
        link.textContent = result.displayLink;

        const description = document.createElement('div');
        description.classList.add('result-description');
        description.textContent = result.snippet;

        item.appendChild(title);
        item.appendChild(link);
        item.appendChild(description);

        searchResults.appendChild(item);
    });
}
