document.getElementById('facebookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fbAccessToken = document.getElementById('fbAccessToken').value;
    const fbPageId = document.getElementById('fbPageId').value;
    const selectedFields = Array.from(document.querySelectorAll('input[name="fields"]:checked'))
        .map(field => field.value);

    console.log('Access Token:', fbAccessToken); // Debugging: Log the access token
    console.log('Page ID:', fbPageId); // Debugging: Log the page ID
    console.log('Selected Fields:', selectedFields); // Debugging: Log the selected fields

    try {
        const response = await fetch(`/api/facebook?accessToken=${fbAccessToken}&pageId=${fbPageId}&fields=${selectedFields.join(',')}`);
        const data = await response.json();
        console.log('API Response:', data); // Debugging: Log the API response

        if (data.error) {
            throw new Error(data.error.message);
        }

        const saveResponse = await fetch('/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const saveResult = await saveResponse.json();
        console.log('Save result:', saveResult);
        alert('Facebook data saved successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to save Facebook data: ${error.message}`);
    }
});
document.getElementById('deleteData').addEventListener('click', async () => {
    const response = await fetch('/deleteData', { method: 'POST' });
    const result = await response.json();
    alert('Old data deleted!');
});