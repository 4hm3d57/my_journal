// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Fetch journals from the server and update the UI
  fetchJournals();
});

function fetchJournals() {
  // Replace 'http://localhost:3000/api/journals' with your actual API endpoint
  fetch('http://localhost:3000/journal')
    .then(response => response.json())
    .then(data => displayJournals(data))
    .catch(error => console.error('Error fetching journals:', error));
}

function displayJournals(journals) {
  const journalList = document.querySelector('.journal-list');

  // Clear existing content
  journalList.innerHTML = '';

  // Iterate through the retrieved journals and create HTML elements
  journals.forEach(journal => {
    const journalItem = document.createElement('div');
    journalItem.classList.add('journal-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = journal.title;

    const contentElement = document.createElement('p');
    contentElement.textContent = journal.content;

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${journal.author}`;

    const dateElement = document.createElement('p');
    const formattedDate = new Date(journal.date).toLocaleDateString();
    dateElement.textContent = `Date: ${formattedDate}`;

    journalItem.appendChild(titleElement);
    journalItem.appendChild(contentElement);
    journalItem.appendChild(authorElement);
    journalItem.appendChild(dateElement);

    journalList.appendChild(journalItem);
  });
}

