// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display journal entries
    fetch('/journal')
      .then(response => response.json())
      .then(entries => {
        const journalList = document.getElementById('journal-list');
  
        entries.forEach(entry => {
          const entryDiv = document.createElement('div');
          entryDiv.className = 'journal-entry';
          entryDiv.innerHTML = `
            <h2 onclick="viewJournalEntry('${entry._id}')">${entry.title}</h2>
            <p>${new Date(entry.timestamp).toLocaleString()}</p>
          `;
          journalList.appendChild(entryDiv);
        });
      })
      .catch(error => console.error('Error fetching entries:', error));
  });
  
  function viewJournalEntry(entryId) {
    // Redirect to a new page or show a modal with the full content of the selected entry
    window.location.href = `/view-entry?id=${entryId}`;
  }
  