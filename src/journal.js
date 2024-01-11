function saveJournalEntry(){
    const title = document.getElementById('title').Value;
    const content = document.getElementById('content').Value;

    fetch('/journal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    })
    .then(response => {
        if(response.ok) {
            alert('Journal entry saved successfully!');
            window.location.href='/';
        }
        else {
            console.error('Error saving entry:', response.statusText);
            alert('Error saving journal entry. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error saving entry', error);
        alert('Error saving journal entry. Please try again.');
    });

}