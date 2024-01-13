// entry.js

document.addEventListener('DOMContentLoaded', function () {
  // Get the entry ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const entryId = urlParams.get('id');

  // Fetch and display the journal entry
  fetchJournalEntry(entryId);
});

function fetchJournalEntry(entryId) {
  // Replace 'http://localhost:3000/api/journal/' with your actual API endpoint for getting a single journal entry
  const endpoint = `http://localhost:3000/journal/${entryId}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => displayJournalEntry(data))
    .catch(error => console.error('Error fetching journal entry:', error));
}

function displayJournalEntry(entry) {
  // Update the HTML elements with the journal entry details
  const entryTitleElement = document.getElementById('entry-title');
  const entryContentElement = document.getElementById('entry-content');
  const entryTimestampElement = document.getElementById('entry-timestamp');

  entryTitleElement.textContent = entry.title;
  entryContentElement.textContent = entry.content;

  const formattedDate = new Date(entry.date).toLocaleString();
  entryTimestampElement.textContent = `Date: ${formattedDate}`;
}

