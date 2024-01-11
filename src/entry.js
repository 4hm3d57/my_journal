// view-entry.js
document.addEventListener('DOMContentLoaded', () => {
    const entryId = new URLSearchParams(window.location.search).get('id');
  
    if (entryId) {
      // Fetch and display the full content of the selected entry
      fetch(`/journal?id=${entryId}`)
        .then(response => response.json())
        .then(entry => {
          const entryTitle = document.getElementById('entry-title');
          const entryContent = document.getElementById('entry-content');
          const entryTimestamp = document.getElementById('entry-timestamp');
  
          entryTitle.textContent = entry.title;
          entryContent.textContent = entry.content;
          entryTimestamp.textContent = new Date(entry.timestamp).toLocaleString();
        })
        .catch(error => console.error('Error fetching entry:', error));
    }
  });
  