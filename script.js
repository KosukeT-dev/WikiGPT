// Get the search form and result div
const searchForm = document.getElementById('search-form');
const resultDiv = document.getElementById('result');

// Handle form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  const searchBox = document.getElementById('search-box');
  const searchTerm = searchBox.value;

  if (searchTerm.trim() === '') {
    resultDiv.innerHTML = '<p>Please enter a search term</p>';
    return;
  }

  // Construct the Wikipedia API URL
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=3&exintro=1&explaintext=1&gsrsearch=${searchTerm}&gsrlimit=10&origin=*`;

  // Make the API request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the pages from the response
      const pages = data.query.pages;

      // Clear the result div
      resultDiv.innerHTML = '';

      // Loop through the pages and display the title and extract
      for (let pageId in pages) {
        const page = pages[pageId];
        const title = page.title;
        const extract = page.extract;
        const pageLink = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

        // Create the article element
        const article = document.createElement('article');
        resultDiv.appendChild(article);

        // Create the title element with a link to the page
        const titleLink = document.createElement('a');
        titleLink.href = pageLink;
        titleLink.target = '_blank';
        article.appendChild(titleLink);

        const titleText = document.createTextNode(title);
        titleLink.appendChild(titleText);

        // Create the paragraph element for the extract
        const extractParagraph = document.createElement('p');
        article.appendChild(extractParagraph);

        // Use a helper function to animate the text typing effect
        animateTextTypingEffect(extract, extractParagraph);
      }
    })
    .catch(error => {
      console.error(error);
      resultDiv.innerHTML = '<p>An error occurred</p>';
    });
});

// Helper function to animate text typing effect
function animateTextTypingEffect(text, element) {
  const characters = text.split('');
  let i = 0;
  const intervalId = setInterval(() => {
    if (i === characters.length) {
      clearInterval(intervalId);
      return;
    }

    element.innerHTML += characters[i];
    i++;
  }, 40);
}