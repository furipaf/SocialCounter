// Function to update the display
async function updateDisplay() {
    console.log('Updating display...');
    try {
        const response = await fetch('/getLatestData');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const display = document.getElementById('display');
        display.innerHTML = '';

        if (data.length === 0) {
            display.innerHTML = '<p>No data available.</p>';
            return;
        }

        data.forEach(item => {
            const box = document.createElement('div');
            box.className = 'info-box';
            box.innerHTML = `
                <img src="/assets/icons/facebook.png" alt="Facebook Logo">
                <h2>${item.name}</h2>
                <p>ID: ${item.id}</p>
                ${item.category ? `<p>Category: ${item.category}</p>` : ''}
                ${item.checkins ? `<p>Checkins: ${item.checkins}</p>` : ''}
                <p>Fan Count: ${item.fan_count}</p>
                ${item.followers_count ? `<p>Followers Count: ${item.followers_count}</p>` : ''}
                <p>Talking About Count: ${item.talking_about_count}</p>
                <p>Were Here Count: ${item.were_here_count}</p>
            `;
            display.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        const display = document.getElementById('display');
        display.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

// Refresh icon functionality
document.getElementById('refreshIcon').addEventListener('click', () => {
    updateDisplay();
});

// Initial data fetch
updateDisplay();