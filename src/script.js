async function viewMoreJournals() {
        try {
            const response = await fetch('/journal');  // Replace with your actual endpoint
            const data = await response.json();

            // Handle the fetched data, e.g., update the current page with the new entries
            const journalList = document.querySelector('.journal-list ul');
            data.latestEntries.forEach(entry => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h2 onclick="viewJournalEntry('${entry._id}')">${entry.title}</h2>
                    <p>${new Date(entry.timestamp).toLocaleString()}</p>
                `;
                journalList.appendChild(li);
            });

        } catch (error) {
            console.error('Error fetching more entries:', error);
        }
}
